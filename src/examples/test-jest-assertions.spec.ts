describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;

    expect(number).toBe(10); // para primitivos
    expect(number).toEqual(10); // para objetos

    expect(number).toBeTruthy();
    expect(number).not.toBeFalsy();
  });

  it('should split tests', () => {
    const number = 10;

    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThanOrEqual(10);

    expect(number).toBeCloseTo(9.991, 1);

    expect(number).not.toBeNull();

    expect(number).toHaveProperty('toString');
  });
});

describe('Objects', () => {
  it('should test jest assertions with objects', () => {
    const person = { name: 'Matheus', age: 30 };
    const anotherPerson = { ...person };

    //expect(person).toBe(anotherPerson); // não passa
    expect(person).toEqual(anotherPerson); // passa

    expect(person).toHaveProperty('age');
    //expect(person).toHaveProperty('age', 31);
    expect(person).not.toHaveProperty('age', 31); // passa
    expect(person).not.toHaveProperty('lastName'); // passa
  });
});
