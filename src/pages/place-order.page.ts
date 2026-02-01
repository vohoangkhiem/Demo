import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { OrderFormData, ConfirmedOrderData } from '../data/order-test-data';
import { alertMessages } from '../data/messages';

export class PlaceOrderPage extends BasePage {
  private readonly modal: Locator;
  private readonly nameInput: Locator;
  private readonly countryInput: Locator;
  private readonly cityInput: Locator;
  private readonly creditCardInput: Locator;
  private readonly monthInput: Locator;
  private readonly yearInput: Locator;
  private readonly purchaseButton: Locator;
  private readonly closeOrderButton: Locator;

  // Confirmation Modal
  private readonly confirmationModal: Locator;
  private readonly confirmationTitle: Locator;
  private readonly confirmationBody: Locator;
  private readonly confirmationOkButton: Locator;

  constructor(page: Page) {
    super(page);
    this.modal = page.locator('#orderModal');
    this.nameInput = this.modal.locator('#name');
    this.countryInput = this.modal.locator('#country');
    this.cityInput = this.modal.locator('#city');
    this.creditCardInput = this.modal.locator('#card');
    this.monthInput = this.modal.locator('#month');
    this.yearInput = this.modal.locator('#year');
    this.purchaseButton = this.modal.locator('button', { hasText: 'Purchase' });
    this.closeOrderButton = this.modal.locator('button', { hasText: 'Close' }).first();

    this.confirmationModal = page.locator('.sweet-alert');
    this.confirmationTitle = this.confirmationModal.locator('h2');
    this.confirmationBody = this.confirmationModal.locator('p.lead');
    this.confirmationOkButton = this.confirmationModal.locator('.confirm');
  }

  async purchase(orderData: OrderFormData): Promise<void> {
    await expect(this.modal).toBeVisible();
    await expect(this.modal).toHaveClass(/show/);
    if (orderData.name) await this.nameInput.fill(orderData.name);
    if (orderData.country) await this.countryInput.fill(orderData.country);
    if (orderData.city) await this.cityInput.fill(orderData.city);
    if (orderData.creditCard) await this.creditCardInput.fill(orderData.creditCard);
    if (orderData.month) await this.monthInput.fill(orderData.month);
    if (orderData.year) await this.yearInput.fill(orderData.year);
    await expect(this.purchaseButton).toBeVisible();
    await expect(this.purchaseButton).toBeEnabled();
    await this.purchaseButton.click();
  }

  async expectOrderConfirmation(orderData: ConfirmedOrderData, expectedTotal: number): Promise<void> {
    await expect(this.confirmationModal).toBeVisible();
    await expect(this.confirmationModal).toHaveClass(/visible/);
    await expect(this.confirmationTitle).toHaveText(alertMessages.purchaseSuccess);

    await expect(this.confirmationBody).toContainText(/Id:\s*\d+/);
    await expect(this.confirmationBody).toContainText(`Amount: ${expectedTotal} USD`);
    await expect(this.confirmationBody).toContainText(`Card Number: ${orderData.creditCard}`);
    await expect(this.confirmationBody).toContainText(`Name: ${orderData.name}`);
    await expect(this.confirmationBody).toContainText('Date:');
  }

  async closeConfirmationModal(): Promise<void> {
    await this.confirmationOkButton.click();
    await expect(this.confirmationModal).not.toBeVisible();
  }
}

export default PlaceOrderPage;
