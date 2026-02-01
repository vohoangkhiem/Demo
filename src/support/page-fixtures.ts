import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignUpPage } from '../pages/signup.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { PlaceOrderPage } from '../pages/place-order.page';
import { CartWorkflow } from '../workflows/cart.workflow';

export interface PageFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  productPage: ProductPage;
  cartPage: CartPage;
  placeOrderPage: PlaceOrderPage;
  cartWorkflow: CartWorkflow;
}

// Factory function to create page fixtures
function createPageFixture<T>(PageClass: new (page: Page) => T) {
  return async ({ page }: { page: Page }, use: (fixture: T) => Promise<void>) => {
    await use(new PageClass(page));
  };
}

export const test = base.extend<PageFixtures>({
  homePage: createPageFixture(HomePage),
  loginPage: createPageFixture(LoginPage),
  signUpPage: createPageFixture(SignUpPage),
  productPage: createPageFixture(ProductPage),
  cartPage: createPageFixture(CartPage),
  placeOrderPage: createPageFixture(PlaceOrderPage),

  cartWorkflow: async ({ homePage, productPage, cartPage, placeOrderPage }, use) => {
    await use(new CartWorkflow(homePage, productPage, cartPage, placeOrderPage));
  },
});

export { expect } from '@playwright/test';
export default test;
