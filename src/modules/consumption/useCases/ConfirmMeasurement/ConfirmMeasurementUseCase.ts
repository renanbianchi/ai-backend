import ConsumptionRepository from "../../../../modules/consumption/repositories/ConsumptionRepository.ts";

export default class ConfirmMeasurementUseCase {
  constructor(
    private consumptionRepository: ConsumptionRepository,
  ) {
    this.consumptionRepository = consumptionRepository;
  }

  async findMeasurementById(measurementId: string) {
      const measurement = await this.consumptionRepository.getMeasurementById(measurementId);

      return measurement
  }

  async UpdateMeasurementByMeasurementId(measurementId: string, confirmedValue: number) {
      const measurement = await this.consumptionRepository.validateMeasurement(measurementId, confirmedValue);

      return measurement
  }
}