import { PrismaClient } from "@prisma/client";
import { ICreateCustomerDTO, ICustomerRepository } from "./interfaces/ICustomerRepository.ts";

export default class CustomerRepository implements ICustomerRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getCustomerById(customerId: string): Promise<any | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId
      }
    });
    return customer;
  }

  async createCustomer(): Promise<any> {
    const newCustomer = await this.prisma.customer.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    return newCustomer;
  }
}