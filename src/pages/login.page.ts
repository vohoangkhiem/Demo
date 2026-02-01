import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { handleDialog } from '../utils/dialog-utils';
import { InvalidLoginTestCase } from '../data/auth-test-data';

export class LoginPage extends BasePage {
  readonly loginModal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly xButton: Locator;
  readonly backdrop: Locator;

  constructor(page: Page) {
    super(page);
    this.loginModal = page.locator('#logInModal');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button').filter({ hasText: 'Log in' });
    this.closeButton = this.loginModal.locator('button').filter({ hasText: 'Close' });
    this.xButton = this.loginModal.locator('.close');
    this.backdrop = page.locator('.modal-backdrop');
  }

  async open(): Promise<void> {
    await this.header.loginLink.click();
    await expect(this.loginModal).toBeVisible();
    await expect(this.loginModal).toHaveClass(/show/);
  }

  async login(username: string, password: string): Promise<void> {
    await this.open();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithInvalidCredentials(testCase: InvalidLoginTestCase): Promise<void> {
    const { username, password } = testCase.credentials;
    const alertMessage = await handleDialog(
      this.page,
      () => this.login(username, password)
    );
    expect(alertMessage).toBe(testCase.expectedMessage);
  }

  async expectLoginSuccess(username: string): Promise<void> {
    await expect(this.loginModal).not.toBeVisible();
    await expect(this.header.welcomeUser).toContainText(`Welcome ${username}`);
    await expect(this.header.logoutLink).toBeVisible();
    await expect(this.header.loginLink).not.toBeVisible();
  }

  async expectLoginFailed(): Promise<void> {
    await expect(this.loginModal).toBeVisible();
    await expect(this.header.welcomeUser).not.toBeVisible();
    await expect(this.header.logoutLink).not.toBeVisible();
    await expect(this.header.loginLink).toBeVisible();
  }
}

export default LoginPage;