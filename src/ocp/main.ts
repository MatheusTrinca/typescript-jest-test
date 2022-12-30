/*
  Open/Closed Principle (OCP)
  Entidades abertas para extensão, porém fechadas para modificação
*/
import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistence } from './services/persistence';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './classes/discount';

//const fiftyPercentDiscount = new FiftyPercentDiscount();
//const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();

const shoppingCart = new ShoppingCart(noDiscount);
const persistence = new Persistence();
const messaging = new Messaging();
const order = new Order(shoppingCart, messaging, persistence);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.94758));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.totalWithDiscount());

console.log(shoppingCart.items);
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
