import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductCategory } from '../data/products';

export class HomePage extends BasePage {
  private readonly categoryLinks: Locator;
  private readonly productCards: Locator;
  private readonly productNames: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryLinks = page.locator('.list-group-item');
    this.productCards = page.locator('#tbodyid .card');
    this.productNames = page.locator('#tbodyid .card-title');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.productCards.first()).toBeVisible();
  }

  async selectCategory(category: ProductCategory): Promise<void> {
    await this.categoryLinks.filter({ hasText: category }).click();
  }

  async selectProduct(productName: string): Promise<void> {
    const product = this.productNames.filter({ hasText: productName });
    await expect(product).toBeVisible();
    await product.click();
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.productCards.first()).toBeVisible();
  }
}
