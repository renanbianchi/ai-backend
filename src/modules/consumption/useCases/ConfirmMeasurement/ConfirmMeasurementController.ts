import { Request, Response } from "express";
import { IConfirmMeasurementRequest } from "./ConfirmMeasurementDTO.ts";
import ConfirmMeasurementUseCase from "./ConfirmMeasurementUseCase.ts";

export default class ConfirmMeasurementController {
  constructor(
    private confirmMeasurementUseCase: ConfirmMeasurementUseCase,
  ) {
    this.confirmMeasurementUseCase = confirmMeasurementUseCase;
  }

  async handle(request: Request, response: Response): Promise<any> {

    const { measure_uuid: measureUuid, confirmed_value: confirmedValue } = request.body as IConfirmMeasurementRequest;

    if (!measureUuid || !confirmedValue ) {
      return response.status(400).json({error_code: 'INVALID_DATA', error_description: 'Há um ou mais campos faltando'});
    }

    const uuidregex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    if (!uuidregex.test(measureUuid)) {
      return response.status(400).json({ error_code: 'INVALID_DATA', error: 'uuid de medida inválida'});
    }

    if (isNaN(confirmedValue)) {
      return response.status(400).json({ error_code: 'INVALID_DATA', error: 'valor inválido.'});
    }

    const hasMeasurementData = await this.confirmMeasurementUseCase.findMeasurementById(measureUuid);

    if (!hasMeasurementData) return response.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error: 'Leitura do mês já realizada'});
  

    await this.confirmMeasurementUseCase.UpdateMeasurementByMeasurementId(measureUuid, confirmedValue);
  
    return response.status(200).json({success: true});
  }
}