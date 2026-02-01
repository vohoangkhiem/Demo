import { Page, APIRequestContext, APIResponse } from '@playwright/test';

export class ApiUtils {
  constructor(private request: APIRequestContext) {}

  async get(endpoint: string, options?: object): Promise<APIResponse> {
    return await this.request.get(endpoint, options);
  }

  async post(endpoint: string, data?: object, options?: object): Promise<APIResponse> {
    return await this.request.post(endpoint, {
      data,
      ...options,
    });
  }

  async put(endpoint: string, data?: object, options?: object): Promise<APIResponse> {
    return await this.request.put(endpoint, {
      data,
      ...options,
    });
  }

  async delete(endpoint: string, options?: object): Promise<APIResponse> {
    return await this.request.delete(endpoint, options);
  }

  async parseJsonResponse<T>(response: APIResponse): Promise<T> {
    return await response.json() as T;
  }

  isSuccessful(response: APIResponse): boolean {
    return response.status() >= 200 && response.status() < 300;
  }
}

export async function createApiContext(page: Page): Promise<APIRequestContext> {
  return page.request;
}

export default ApiUtils;
