import { Product } from './product';

const createSut = (name: string, price: number) => new Product(name, price);

describe('Product', () => {
  it('should return undefined', () => {
    const sut = createSut('Camiseta', 99.9);
    //expect(sut).toHaveProperty('name', sut.name);
    expect(sut).toHaveProperty('name', 'Camiseta');
    expect(sut.price).toBeCloseTo(99.9);
  });
});
