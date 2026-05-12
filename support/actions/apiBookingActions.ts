import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export function createApiBookingActions(request: APIRequestContext) {
  return {
    async createBooking(payload: any) {
      return await request.post(`${BASE_URL}/booking`, {
        data: payload
      });
    },

    async getBooking(bookingId: number) {
      return await request.get(`${BASE_URL}/booking/${bookingId}`);
    },

    async updateBooking(bookingId: number, payload: any, token?: string) {
      const options: any = { data: payload };
      if (token) {
        options.headers = { Cookie: `token=${token}` };
      }
      return await request.put(`${BASE_URL}/booking/${bookingId}`, options);
    },

    async deleteBooking(bookingId: number, token: string) {
      return await request.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` }
      });
    },

    async assertBookingCreationSuccess(response: any, expectedFirstName: string) {
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('bookingid');
      expect(body.booking.firstname).toBe(expectedFirstName);
      return body.bookingid;
    },

    async assertBookingCreationFailure(response: any) {
      expect(response.status()).toBe(500);
    }
  };
}
