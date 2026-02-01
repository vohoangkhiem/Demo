import { test as base, APIRequestContext, expect } from '@playwright/test';
import { ApiUtils } from '../utils/api-utils';
import { config } from '../config/environment';

export interface ApiFixtures {
  apiClient: ApiUtils;
  apiContext: APIRequestContext;
}

/**
 * API test fixtures for testing REST endpoints
 * 
 * Usage:
 * ```typescript
 * import { apiTest } from '../../src/support/api-fixtures';
 * 
 * apiTest('should get products', async ({ apiClient }) => {
 *   const response = await apiClient.get('/entries');
 *   expect(apiClient.isSuccessful(response)).toBe(true);
 * });
 * ```
 */
export const apiTest = base.extend<ApiFixtures>({
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: config.baseUrl,
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    await use(context);
    await context.dispose();
  },

  apiClient: async ({ apiContext }, use) => {
    const client = new ApiUtils(apiContext);
    await use(client);
  },
});

export { expect } from '@playwright/test';
export default apiTest;
