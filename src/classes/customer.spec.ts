import { IndividualCustomer, EnterpriseCustomer } from './customer';

afterEach(() => jest.clearAllMocks());

describe('Individual Customer', () => {
  const createIndividualCustomer = (
    firstName: string,
    lastName: string,
    cpf: string,
  ): IndividualCustomer => new IndividualCustomer(firstName, lastName, cpf);
  // atributos são publicos
  it('should have firstName, lastName, cpf', () => {
    const sut = createIndividualCustomer('Matheus', 'Trinca', '374.027.678-92');
    expect(sut).toHaveProperty('firstName', 'Matheus');
    expect(sut).toHaveProperty('lastName', 'Trinca');
    expect(sut).toHaveProperty('cpf', '374.027.678-92');
  });

  it('should have methods getName and getIDN for individual customers', () => {
    const sut = createIndividualCustomer('Matheus', 'Trinca', '374.027.678-92');
    expect(sut.getName()).toBe('Matheus Trinca');
    expect(sut.getIDN()).toBe('374.027.678-92');
  });
});

describe('Enterprise Customer', () => {
  const createEnterpriseCustomer = (
    name: string,
    cnpj: string,
  ): EnterpriseCustomer => new EnterpriseCustomer(name, cnpj);

  it('should have name and cnpj', () => {
    const sut = createEnterpriseCustomer('Udemy', '123456789');
    expect(sut).toHaveProperty('name', 'Udemy');
    expect(sut).toHaveProperty('cnpj', '123456789');
  });

  it('should have methods getName and getIDN for enterprise customers', () => {
    const sut = createEnterpriseCustomer('Udemy', '123456789');
    expect(sut.getName()).toBe('Udemy');
    expect(sut.getIDN()).toBe('123456789');
  });
});
