import { Measurement, MeasurementType, Prisma, PrismaClient } from '@prisma/client';
import { IConsumptionRepository, IRegisterMeasurementDTO } from "./interfaces/IConsumptionRepository.ts";

export default class ConsumptionRepository implements IConsumptionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async registerMeasurement(measurement: IRegisterMeasurementDTO): Promise<Measurement> {
    const newMeasurement = await this.prisma.measurement.create({
      data: {
        measurementTime: measurement.measurementTime,
        measurementType: measurement.measurementType,
        value: measurement.value,
        hasConfirmedMeasurement: false,
        imageUrl: measurement.imageUrl,
        customerId: measurement.customerId
      }
    });
    return newMeasurement;
  }

  async getMeasurementsByCustomerId(customerId: string): Promise<Measurement[] | []> {
    const measurements = await this.prisma.measurement.findMany({
      where: {
        customerId: customerId
      }
    });

    return measurements;
  }

  async getMeasurementsByCustomerIdAndMeasurementType(customerId: string, measureType: MeasurementType): Promise<Measurement[] | []> {
    const measurements = await this.prisma.measurement.findMany({
      where: {
        customerId: customerId,
        measurementType: measureType
      }
    });

    return measurements;
  }

  async getMeasurementById(measurementId: string): Promise<Measurement | null> {
    const measurement = await this.prisma.measurement.findUnique({
      where: {
        id: measurementId
      }
    });
    return measurement;
  }

  async validateMeasurement(measurementId: string, confirmedValue: number): Promise<Measurement | null> {
    const validatedMeasurement = await this.prisma.measurement.update({
      where: {
        id: measurementId
      },
      data: {
        value: new Prisma.Decimal(confirmedValue),
        hasConfirmedMeasurement: true
      }
    });
    return validatedMeasurement;
  }

  async getMeasurementByIdAndMeasurementTime(customerId: string, measurementTime: Date): Promise<Measurement | null> {
    const measurement = await this.prisma.measurement.findFirst({
      where: {
        customerId: customerId,
        measurementTime: measurementTime
      }
    });

    return measurement;
  }
}
