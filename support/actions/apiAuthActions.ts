import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

export function createApiAuthActions(request: APIRequestContext) {
  return {
    async generateToken(username = 'admin', password = 'password123') {
      const response = await request.post(`${BASE_URL}/auth`, {
        data: { username, password }
      });
      return response;
    },

    async getTokenValue() {
      const response = await this.generateToken();
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      return body.token;
    },

    async assertSuccessfulTokenGeneration(response: any) {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('token');
      expect(typeof body.token).toBe('string');
    },

    async assertFailedTokenGeneration(response: any) {
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body).toHaveProperty('reason');
      expect(body.reason).toBe('Bad credentials');
    }
  };
}
