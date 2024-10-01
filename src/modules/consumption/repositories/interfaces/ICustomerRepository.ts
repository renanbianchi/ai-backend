import { Customer } from "@prisma/client";

export type ICustomerDTO = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateCustomerDTO = {
  id: string;
};

export interface ICustomerRepository {
  getCustomerById(customerId: string): Promise<Customer | null>;
  createCustomer(customer: ICustomerDTO): Promise<Customer>;
}