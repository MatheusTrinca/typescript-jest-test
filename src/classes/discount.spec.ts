import {
  Discount,
  NoDiscount,
  FiftyPercentDiscount,
  TenPercentDiscount,
} from './discount';

const createSut = (className: new () => Discount): Discount => new className();

describe('Discount', () => {
  it('should have no discount', () => {});
});
