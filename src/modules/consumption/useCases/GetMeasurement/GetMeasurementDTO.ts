import { MeasurementType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type IMeasurementRequest = {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasurementType;
}

export type MeasurementData = {
  image: string;
  customerId: string;
  measurementTime: Date;
  measurementType: MeasurementType;
}

export type RegisterMeasurementDTO = {
  measurementTime: Date;
  measurementType: MeasurementType;
  value: Decimal;
  imageUrl: string;
  customerId: string;
}

export type FileStorageResponseData = {
  fileUri: string;
  mimetype: string;
}