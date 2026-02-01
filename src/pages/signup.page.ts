import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AuthTestData, UserCredentials } from '../data/auth-test-data';
import { handleDialog } from '../utils/dialog-utils';
import { alertMessages } from '../data/messages';

export class SignUpPage extends BasePage {
  readonly signUpModal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpModal = page.locator('#signInModal');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.signUpButton = page.locator('button').filter({ hasText: 'Sign up' });
    this.closeButton = this.signUpModal.locator('.close');
  }

  async open(): Promise<void> {
    await this.header.signUpLink.click();
    await expect(this.signUpModal).toBeVisible();
    await expect(this.signUpModal).toHaveClass(/show/);
  }

  async signUp(credentials?: UserCredentials): Promise<{ username: string; password: string; message: string }> {
    const username = credentials?.username ?? AuthTestData.generateUsername();
    const password = credentials?.password ?? AuthTestData.generatePassword();
    
    await this.open();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
   
    const message = await handleDialog(
      this.page,
      () => this.signUpButton.click()
    );

    return { username, password, message };
  }
}

export default SignUpPage;
