import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly logoutLink: Locator;
  readonly welcomeUser: Locator;
  readonly cartLink: Locator;
  readonly homeLink: Locator;

  constructor(private page: Page) {
    this.loginLink = page.locator('#login2');
    this.signUpLink = page.locator('#signin2');
    this.logoutLink = page.locator('#logout2');
    this.welcomeUser = page.locator('#nameofuser');
    this.cartLink = page.locator('#cartur');
    this.homeLink = page.locator('.navbar-brand');
  }
}

export default HeaderComponent;
