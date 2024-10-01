import { getPrisma } from "../../../../../prisma/prisma.ts";
import ConsumptionRepository from "../../../../modules/consumption/repositories/ConsumptionRepository.ts";
import ConfirmMeasurementController from "./ConfirmMeasurementController.ts";
import ConfirmMeasurementUseCase from "./ConfirmMeasurementUseCase.ts";

export default async function GetMeasurement() {
  const prisma = await getPrisma();

  const consumptionRepository = new ConsumptionRepository(prisma);
  const confirmMeasurementUseCase = new ConfirmMeasurementUseCase(consumptionRepository);
  const confirmMeasurementController = new ConfirmMeasurementController(confirmMeasurementUseCase)

  return {confirmMeasurementUseCase, confirmMeasurementController};
}