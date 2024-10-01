/*
  Warnings:

  - Changed the type of `measurement_time` on the `measurements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "measurements" DROP COLUMN "measurement_time",
ADD COLUMN     "measurement_time" TIMESTAMP(3) NOT NULL;
