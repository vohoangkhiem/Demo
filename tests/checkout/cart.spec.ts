import { test } from '../../src/support/page-fixtures';
import { cartTestCases } from '../../src/data/cart-test-data';

test.describe('Cart Feature', () => {

  test.describe('Add items to cart and view cart contents', { tag: ['@functional', '@smoke', '@regression'] }, () => {
    
    for (const testCase of cartTestCases) {
      test(testCase.description, async ({ cartWorkflow, cartPage }) => {
        await cartWorkflow.addProductsToCart(testCase);
        await cartPage.expectCartContents(testCase);
      });
    }
  });
});
