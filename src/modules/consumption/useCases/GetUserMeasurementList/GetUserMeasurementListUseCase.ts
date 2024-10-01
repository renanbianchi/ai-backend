import { Customer, Measurement, MeasurementType } from "@prisma/client";
import ConsumptionRepository from "../../../../modules/consumption/repositories/ConsumptionRepository.ts";
import CustomerRepository from "../../repositories/CustomerRepository.ts";

export default class GetUserMeasurementListUseCase {
  constructor(
    private consumptionRepository: ConsumptionRepository,
    private customerRepository: CustomerRepository,
  ) {
    this.consumptionRepository = consumptionRepository;
    this.customerRepository = customerRepository;
  }

  async findMeasurementsByCustomerIdAndMeasurementType(customerId: string, measureType?: MeasurementType): Promise<Measurement[]> {
    if (measureType !== undefined) {
      return await this.consumptionRepository.getMeasurementsByCustomerIdAndMeasurementType(customerId, measureType);
    }
    
    return await this.consumptionRepository.getMeasurementsByCustomerId(customerId);
  }

  async findCustomerById(customerId: string): Promise<Customer> {
    const customer = await this.customerRepository.getCustomerById(customerId);

    return customer
  }
}