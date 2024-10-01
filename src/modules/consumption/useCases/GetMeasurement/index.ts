import TempFileService from "../../../../services/fs/index.ts";
import { getPrisma } from "../../../../../prisma/prisma.ts";
import ConsumptionRepository from "../../../../modules/consumption/repositories/ConsumptionRepository.ts";
import CustomerRepository from "../../../../modules/consumption/repositories/CustomerRepository.ts";
import GetMeasurementController from "./GetMeasurementController.ts";
import GetMeasurementUseCase from "./GetMeasurementUseCase.ts";

export default async function GetMeasurement() {
  const prisma = await getPrisma();

  const consumptionRepository = new ConsumptionRepository(prisma);
  const customerRepository = new CustomerRepository(prisma);
  const getMeasurementUseCase = new GetMeasurementUseCase(consumptionRepository, customerRepository);
  const temFileService = new TempFileService();
  const getMeasurementController = new GetMeasurementController(getMeasurementUseCase, temFileService);

  return {getMeasurementUseCase, getMeasurementController, };
}