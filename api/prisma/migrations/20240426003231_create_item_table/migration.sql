-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('PRODUCT', 'OFF_SERVICE', 'INTERNET_SERVICE');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_in_cents" INTEGER NOT NULL,
    "type" "ItemType" NOT NULL,
    "coverage_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coverage" (
    "id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "Coverage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_coverage_id_fkey" FOREIGN KEY ("coverage_id") REFERENCES "Coverage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
