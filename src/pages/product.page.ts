import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { handleDialog } from '../utils/dialog-utils';
import { alertMessages } from '../data/messages';

export class ProductPage extends BasePage {
  private readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.locator('a', { hasText: 'Add to cart' });
  }

  async addToCart(): Promise<void> {
    await handleDialog(
      this.page,
      () => this.addToCartButton.click(),
      alertMessages.productAdded
    );
  }
}

export default ProductPage;
