import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { CartTestCase } from '../data/cart-test-data';

export class CartPage extends BasePage {
  private readonly cartRows: Locator;
  private readonly totalPrice: Locator;
  private readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartRows = page.locator('#tbodyid tr');
    this.totalPrice = page.locator('#totalp');
    this.placeOrderButton = page.locator('button', { hasText: 'Place Order' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
    await expect(this.placeOrderButton).toBeVisible();
  }

  async expectCartContents(testData: CartTestCase): Promise<void> {
    await this.goto();
    await expect(this.cartRows).toHaveCount(testData.products.length);
    
    for (const product of testData.products) {
      const row = this.cartRows.filter({ hasText: product.name });
      await expect(row).toBeVisible();
      await expect(row.locator('td').nth(2)).toHaveText(product.price.toString());
    }
    
    await expect(this.totalPrice).toHaveText(testData.expectedTotal.toString());
  }

  async clickPlaceOrder(): Promise<void> {
    await this.goto();
    await expect(this.totalPrice).not.toBeEmpty();
    await this.placeOrderButton.click();
  }
}

export default CartPage;
