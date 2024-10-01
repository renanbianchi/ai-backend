import { Request, Response } from "express";
import { IGetUserMeasurementListRequestParams, IGetUserMeasurementListRequestQuery } from "./GetUserMeasurementListDTO.ts";
import GetUserMeasurementListUseCase from "./GetUserMeasurementListUseCase.ts";
import { MeasurementType } from "@prisma/client";


export default class GetUserMeasurementListController {
  constructor(
    private getUserMeasurementListUseCase: GetUserMeasurementListUseCase,
  ) {
    this.getUserMeasurementListUseCase = getUserMeasurementListUseCase;
  }

  async handle(request: Request, response: Response): Promise<any> {

    const { customer_id: customerId } = request.params as IGetUserMeasurementListRequestParams;

    const { measure_type: measureType } = request.query as IGetUserMeasurementListRequestQuery;

    const uuidregex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    if (!customerId || !uuidregex.test(customerId )) {
      return response.status(400).json({error_code: 'INVALID_DATA', error_description: 'identificador de cliente inválido'});
    }

    if (measureType && !Object.values(MeasurementType).includes(measureType as MeasurementType)) {
      return response.status(400).json({error_code: 'INVALID_TYPE', error_description: 'Tipo de medição não permitida'});
    }

    const hasCustomerId = await this.getUserMeasurementListUseCase.findCustomerById(customerId);

    if (!hasCustomerId) return response.status(404).json({ error_code: 'NOT_FOUND', error: 'Cliente não encontrado'});

    const measures = await this.getUserMeasurementListUseCase.findMeasurementsByCustomerIdAndMeasurementType(customerId, measureType);

    console.log('measures: ', measures);

    if (measures && measures.length === 0) return response.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error: 'Nenhuma leitura encontrada'});
  
    return response.status(200).json({customer_code: customerId, measures});
  }
}