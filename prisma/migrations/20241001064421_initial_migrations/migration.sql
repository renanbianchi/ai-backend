-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "measurement_time" TIMESTAMP(3) NOT NULL,
    "measurement_type" "MeasurementType" NOT NULL,
    "value" INTEGER NOT NULL,
    "has_confirmed_measurement" BOOLEAN NOT NULL,
    "image_url" TEXT,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);
