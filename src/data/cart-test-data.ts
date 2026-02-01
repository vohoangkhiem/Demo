import { ProductCategory } from './products';

export interface Product {
  name: string;
  price: number;
  category: ProductCategory;
}

export interface CartTestCase {
  description: string;
  products: Product[];
  expectedTotal: number;
}

export const singleProduct: CartTestCase = {
  description: 'Add single product to the cart',
  products: [
    { name: 'Samsung galaxy s6', price: 360, category: 'Phones' }
  ],
  expectedTotal: 360
};

const multipleProducts: CartTestCase = {
  description: 'Add multiple products from different categories to the cart',
  products: [
    { name: 'Samsung galaxy s6', price: 360, category: 'Phones' },
    { name: 'MacBook air', price: 700, category: 'Laptops' },
    { name: 'Apple monitor 24', price: 400, category: 'Monitors' }
  ],
  expectedTotal: 1460
};

export const cartTestCases: CartTestCase[] = [
  singleProduct,
  multipleProducts
];
