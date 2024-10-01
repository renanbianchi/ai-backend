import { getPrisma } from "../../../../../prisma/prisma.ts";
import ConsumptionRepository from "../../../../modules/consumption/repositories/ConsumptionRepository.ts";
import CustomerRepository from "../../../../modules/consumption/repositories/CustomerRepository.ts";
import GetUserMeasurementListController from "./GetUserMeasurementListController.ts";
import GetUserMeasurementListUseCase from "./GetUserMeasurementListUseCase.ts";

export default async function GetUserMeasurementList() {
  const prisma = await getPrisma();

  const consumptionRepository = new ConsumptionRepository(prisma);
  const customerRepository = new CustomerRepository(prisma);
  const getUserMeasurementListUseCase = new GetUserMeasurementListUseCase(consumptionRepository, customerRepository);
  const getUserMeasurementListController = new GetUserMeasurementListController(getUserMeasurementListUseCase)

  return {getUserMeasurementListUseCase, getUserMeasurementListController};
}