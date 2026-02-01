import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { PlaceOrderPage } from '../pages/place-order.page';
import { CartTestCase } from '../data/cart-test-data';
import { OrderTestCase } from '../data/order-test-data';

export class CartWorkflow {
  constructor(
    private homePage: HomePage,
    private productPage: ProductPage,
    private cartPage: CartPage,
    private placeOrderPage: PlaceOrderPage
  ) {}

  async addProductsToCart(testData: CartTestCase): Promise<void> {
    for (const product of testData.products) {
      await this.homePage.goto();
      await this.homePage.selectCategory(product.category);
      await this.homePage.selectProduct(product.name);
      await this.productPage.addToCart();
    }
  }

  async checkout(testCase: OrderTestCase): Promise<void> {
    await this.addProductsToCart(testCase.cart);
    await this.cartPage.clickPlaceOrder();
    await this.placeOrderPage.purchase(testCase.orderData);
  }
}