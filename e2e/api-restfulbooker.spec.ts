import { test, expect } from '../support/fixtures';

test.describe('Restful-Booker - API Tests (Feature-Actions)', () => {

  test('CT06 - Autenticação Básica (Gerar Token)', async ({ app }) => {
    const response = await app.api.auth.generateToken('admin', 'password123');
    await app.api.auth.assertSuccessfulTokenGeneration(response);
  });

  test('CT07 - Autenticação com Credenciais Inválidas (Cenário Negativo)', async ({ app }) => {
    const response = await app.api.auth.generateToken('admin', 'wrongpassword');
    await app.api.auth.assertFailedTokenGeneration(response);
  });

  test('CT08 - Criar Reserva (Campos Obrigatórios)', async ({ app }) => {
    // Act (Cenário Negativo)
    const badResponse = await app.api.booking.createBooking({
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
    });
    await app.api.booking.assertBookingCreationFailure(badResponse);

    // Act (Cenário Positivo)
    const response = await app.api.booking.createBooking({
      firstname: "QA",
      lastname: "Engineer",
      totalprice: 250,
      depositpaid: true,
      bookingdates: { checkin: "2026-05-01", checkout: "2026-05-10" },
      additionalneeds: "Late Checkout"
    });
    
    const bookingId = await app.api.booking.assertBookingCreationSuccess(response, 'QA');

    // Teardown
    const token = await app.api.auth.getTokenValue();
    await app.api.booking.deleteBooking(bookingId, token);
  });

  test('CT09 - Consultar e Atualizar Reserva Existente', async ({ app }) => {
    // Arrange
    const createResponse = await app.api.booking.createBooking({
      firstname: "Jim", lastname: "Brown", totalprice: 111, depositpaid: true,
      bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
    });
    const bookingId = (await createResponse.json()).bookingid;
    const token = await app.api.auth.getTokenValue();

    // Consultar
    const getResponse = await app.api.booking.getBooking(bookingId);
    expect((await getResponse.json()).firstname).toBe('Jim');

    // Atualizar sem Auth (Negativo)
    const unauthorizedPut = await app.api.booking.updateBooking(bookingId, {
      firstname: "Updated", lastname: "Name", totalprice: 999, depositpaid: false,
      bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
    });
    expect(unauthorizedPut.status()).toBe(403);

    // Atualizar com Auth (Positivo)
    const putResponse = await app.api.booking.updateBooking(bookingId, {
      firstname: "Updated", lastname: "Name", totalprice: 999, depositpaid: false,
      bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
    }, token);
    
    expect(putResponse.status()).toBe(200);
    expect((await putResponse.json()).firstname).toBe('Updated');

    // Teardown
    await app.api.booking.deleteBooking(bookingId, token);
  });

  test('CT10 - Deletar Reserva', async ({ app }) => {
    // Arrange
    const createResponse = await app.api.booking.createBooking({
      firstname: "Delete", lastname: "Me", totalprice: 111, depositpaid: true,
      bookingdates: { checkin: "2026-01-01", checkout: "2026-01-02" }
    });
    const bookingId = (await createResponse.json()).bookingid;
    const token = await app.api.auth.getTokenValue();

    // Act
    const deleteResponse = await app.api.booking.deleteBooking(bookingId, token);
    expect(deleteResponse.status()).toBe(201); // Created

    // Validate Deletion
    const getResponse = await app.api.booking.getBooking(bookingId);
    expect(getResponse.status()).toBe(404);
  });

});
