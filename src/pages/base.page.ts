import { Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class BasePage {
  readonly header: HeaderComponent;

  constructor(protected page: Page) {
    this.header = new HeaderComponent(page);
  }
}
