import { test } from '../../src/support/page-fixtures';
import { orderTestCases } from '../../src/data/order-test-data';

test.describe('Order Feature', () => {

  test.describe('Place order successfully', { tag: ['@functional', '@end-to-end', '@smoke', '@regression'] }, () => {
    
    for (const testCase of orderTestCases) {
      test(testCase.description, async ({ cartWorkflow, placeOrderPage, homePage }) => {
        await cartWorkflow.checkout(testCase);
        await placeOrderPage.expectOrderConfirmation(testCase.orderData, testCase.cart.expectedTotal);
        await placeOrderPage.closeConfirmationModal();
        await homePage.expectPageLoaded();
      });
    }
  });
});
