import ConsumptionRepository from "../../../../modules/consumption/repositories/ConsumptionRepository.ts";
import CustomerRepository from "../../../../modules/consumption/repositories/CustomerRepository.ts";
import GeminiService from "../../../../services/Gemini/index.ts";
import { FileStorageResponseData, RegisterMeasurementDTO } from "./GetMeasurementDTO.ts";

export default class GetMeasurementUseCase {
  constructor(
    private consumptionRepository: ConsumptionRepository,
    private customerRepository: CustomerRepository,
  ) {
    this.consumptionRepository = consumptionRepository;
    this.customerRepository = customerRepository;
  }

  async UploadFile(image: string): Promise<any> {
    try {
      const responseData = await GeminiService.uploadImage(image);

      return responseData;
    }
    catch (error) {
      console.log('error: ', error)
      return error;
    }
  }

  async GetMeasurementData({fileUri, mimetype}: FileStorageResponseData): Promise<any> {
    const promptResponse = await GeminiService.generateDataFromImage({
      fileUri,
      mimetype
    });

    return promptResponse;
    
  }

  async GetOrCreateCustomer(customerId: string): Promise<any> {
    if (!customerId) return this.customerRepository.createCustomer();

    const customer = await this.customerRepository.getCustomerById(customerId);

    return customer;
  }

  async RegisterMeasurement({measurementTime, measurementType, value, imageUrl, customerId}: RegisterMeasurementDTO): Promise<any> {
    const measurement = await this.consumptionRepository.registerMeasurement({
      measurementTime: measurementTime,
      measurementType,
      value,
      imageUrl,
      customerId
    });
    return measurement
  }

  async GetMeasurementByCustomerIdAndMeasurementTime(customerId: string, measurementTime: Date) {
    const measurementData = await this.consumptionRepository.getMeasurementByIdAndMeasurementTime(customerId, measurementTime);

    return measurementData
  }
}