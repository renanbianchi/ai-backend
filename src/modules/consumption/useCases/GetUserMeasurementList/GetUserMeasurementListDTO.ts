import { MeasurementType } from "@prisma/client";

export type IGetUserMeasurementListRequestParams = {
  customer_id: string;
}

export type IGetUserMeasurementListRequestQuery = {
  measure_type?: MeasurementType
}
