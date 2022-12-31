/*
  Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem
  depender de abstrações.
  Dependa de abstrações, não de implementações.
  Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

  Classes de baixo nível são classes que executam tarefas (os detalhes).
  Classes de alto nível são classes que gerenciam classes de baixo nível.
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
import { EnterpriseCustomer, IndividualCustomer } from './classes/customer';
import { MessagingProtocol } from './classes/interfaces/messaging-protocol';

//const fiftyPercentDiscount = new FiftyPercentDiscount();
//const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();

// const individualCustomer = new IndividualCustomer(
//   'Matheus',
//   'Felipe',
//   '111.111.111-11',
// );

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {
    console.log('Mensagem enviada pelo Mock: ', msg);
  }
}

const enterpriseCustomer = new EnterpriseCustomer(
  'Matheus PJ',
  '111.001-34234/3423',
);
const shoppingCart = new ShoppingCart(noDiscount);
const persistence = new Persistence();
const messaging = new Messaging();
const messagingMock = new MessagingMock();
const order = new Order(
  shoppingCart,
  messagingMock,
  persistence,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.94758));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.totalWithDiscount());

console.log(shoppingCart.items);
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
