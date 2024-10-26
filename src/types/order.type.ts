import { BillingDetail } from './billingDetail.type';
import { Cart } from './cart.type';
import { Coupon } from './coupon.type';
enum OrderStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  INIT = 'INIT',
  SHIPPING = 'SHIPPING',
  CANCELLED = 'CANCELLED',
  DONE = 'DONE',
}
interface Order {
  _id: string;
  cart: Cart;
  coupon: Coupon;
  totalPrice: number;
  status: OrderStatus;
  billingDetails: BillingDetail;
}

export { Order, OrderStatus };
