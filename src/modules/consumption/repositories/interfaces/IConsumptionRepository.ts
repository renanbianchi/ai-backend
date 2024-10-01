import { Measurement } from "@prisma/client";
import { MeasurementType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type IRegisterMeasurementDTO = {
 measurementTime: Date;
 measurementType: MeasurementType;
 value: Decimal;
 imageUrl: string;
 customerId: string;
};

export interface IConsumptionRepository {
  registerMeasurement(data: IRegisterMeasurementDTO): Promise<Measurement>;
  getMeasurementsByCustomerId(customerId: string): Promise<Measurement[]>;
  getMeasurementById(measurementId: string): Promise<Measurement | null>;
  validateMeasurement(measurementId: string, confirmedValue: number): Promise<Measurement | null>;
}
