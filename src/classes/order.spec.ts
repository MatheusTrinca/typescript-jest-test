/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartItem } from './interfaces/cart-item';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistenceProtocol } from './interfaces/persistence-protocol';
import { ShoppingCartProtocol } from './interfaces/shoppingcart-protocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 2;
  }
  clear(): void {}
  isEmpty(): boolean {
    return false;
  }
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string) {}
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getIDN(): string {
    return '';
  }
  getName(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingcartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingcartMock,
    messagingMock,
    persistenceMock,
    customerMock,
  );

  return {
    sut,
    shoppingcartMock,
    messagingMock,
    persistenceMock,
  };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingcartMock } = createSut();
    const shoppingcartMockSpy = jest
      .spyOn(shoppingcartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingcartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should not checkout if cart is not empty', () => {
    const { sut, shoppingcartMock } = createSut();
    const shoppingcartMockSpy = jest
      .spyOn(shoppingcartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingcartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send message to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toBeCalledTimes(1);
  });

  it('should save an order', () => {
    const { sut, persistenceMock } = createSut();
    const persistenceMockSpy = jest.spyOn(persistenceMock, 'saveOrder');
    sut.checkout();
    expect(persistenceMockSpy).toBeCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingcartMock } = createSut();
    const shoppingcartMockSpy = jest.spyOn(shoppingcartMock, 'clear');
    sut.checkout();
    expect(shoppingcartMockSpy).toBeCalledTimes(1);
  });
});
