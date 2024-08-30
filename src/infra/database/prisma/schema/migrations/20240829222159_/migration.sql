-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('GAS', 'WATER');

-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "type" "MeasureType" NOT NULL,
    "datetime_of_read" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_code" TEXT NOT NULL,
    "hasConfirmed" BOOLEAN NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);
