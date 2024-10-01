-- AlterTable
ALTER TABLE "measurements" ALTER COLUMN "measurement_time" SET DATA TYPE TEXT,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);
