import { Customer, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { FileStorageResponseData, IMeasurementRequest } from "./GetMeasurementDTO.ts";
import GetMeasurementUseCase from "./GetMeasurementUseCase.ts";
import TempFileService from "../../../../services/fs/index.ts";

export default class GetMeasurementController {
  constructor(
    private getMeasurementUseCase: GetMeasurementUseCase,
    private tempFileService: TempFileService,
  ) {
    this.getMeasurementUseCase = getMeasurementUseCase;
    this.tempFileService = tempFileService;
  }

  async handle(request: Request, response: Response): Promise<any> {

    const { image, customer_code: customerId, measure_datetime: measurementTime, measure_type: measurementType } = request.body as IMeasurementRequest;

    if (!image || !measurementTime || !measurementType) {
      return response.status(400).json({error_code: 'INVALID_DATA', error_description: 'Há um ou mais campos faltando'});
    } 

    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  
    if (!base64regex.test(image)) {
      return response.status(400).json({error_code: 'INVALID_DATA', error_description: 'Imagem inválida'});
    }

    const uuidregex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    if (customerId && !uuidregex.test(customerId)) {
      return response.status(400).json({ error: 'uuid de cliente inválido.'});
    }

    const CustomerData: Customer = await this.getMeasurementUseCase.GetOrCreateCustomer(customerId);

    if (!CustomerData) return response.status(400).json({error_code: "INTERNAL_ERROR", error_description: 'Erro ao encontrar ou criar dados do cliente'});

    const writtenFile: string = await this.tempFileService.WriteFile(image);

    const responseData: FileStorageResponseData = await this.getMeasurementUseCase.UploadFile(writtenFile);

    if (!responseData || !responseData.fileUri || !responseData.mimetype) {
      await this.tempFileService.DeleteFile(writtenFile)

      return response.status(400).json({error_code: "INTERNAL_ERROR", error_description: 'Erro no envio da imagem'});
    } 

    const promptResponse = await this.getMeasurementUseCase.GetMeasurementData(responseData);

    const [value, period] = promptResponse.response.candidates[0].content.parts[0].text.trim().split(',');

    const formattedMonth = period.split(': ')[1].replace('.', '');
    
    if (formattedMonth === "not available") {
      await this.tempFileService.DeleteFile(writtenFile)
      
      return response.status(400).json({error_code: "INVALID_DATA", error_description: 'Período ilegível'});
    } 

    if (value.split(': ')[1] === "not available") {
      await this.tempFileService.DeleteFile(writtenFile)

      return response.status(400).json({error_code: "INVALID_DATA", error_description: 'Valor ilegível'});
    }

    const formattedValue = new Prisma.Decimal(value.split(': ')[1]);

    const [month, year] = formattedMonth.split('/');

    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

    const hasMeasurementData = await this.getMeasurementUseCase.GetMeasurementByCustomerIdAndMeasurementTime(CustomerData.id, date);


    if (hasMeasurementData) {
      await this.tempFileService.DeleteFile(writtenFile)

      return response.status(409).json({error_code: "DOUBLE_REPORT", error_description: 'Leitura do mês já realizada'});
    } 

    const measurement = await this.getMeasurementUseCase.RegisterMeasurement({
      measurementTime: date,
      measurementType: measurementType,
      value: formattedValue,
      imageUrl: responseData.fileUri,
      customerId: CustomerData.id
    });

    await this.tempFileService.DeleteFile(writtenFile);
  
    return response.status(200).json({image_url: responseData.fileUri, measure_value: new Prisma.Decimal(formattedValue), measure_uuid: measurement.id, customer_code: customerId});
  }
}