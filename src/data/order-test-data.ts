import { CartTestCase, singleProduct } from './cart-test-data';

export interface OrderFormData {
  name?: string;
  country?: string;
  city?: string;
  creditCard?: string;
  month?: string;
  year?: string;
}

export type ConfirmedOrderData = Required<Pick<OrderFormData, 'name' | 'creditCard'>> & Omit<OrderFormData, 'name' | 'creditCard'>;

export interface OrderTestCase {
  description: string;
  cart: CartTestCase;
  orderData: ConfirmedOrderData;
}

const currentYear = new Date().getFullYear();
const nextYear = (currentYear + 1).toString();

export const orderTestCases: OrderTestCase[] = [
  {
    description: 'Place order with all required and optional fields completed',
    cart: singleProduct,
    orderData: {
      name: 'John Doe',
      country: 'USA',
      city: 'New York',
      creditCard: '4111111111111110',
      month: '12',
      year: nextYear
    }
  },
  {
    description: 'Place order with only mandatory fields completed',
    cart: singleProduct,
    orderData: {
      name: 'John Doe',
      country: '',
      city: '',
      creditCard: '4111111111111110',
      month: '',
      year: ''
    }
  },
  {
    description: 'Place order with valid data including special characters',
    cart: singleProduct,
    orderData: {
      name: "O'Brien-Smith Jr.",
      country: 'USA',
      city: 'Los Angeles',
      creditCard: '4111111111111110',
      month: '12',
      year: nextYear
    }
  }
];

