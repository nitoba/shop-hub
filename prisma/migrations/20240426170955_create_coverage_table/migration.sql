/*
  Warnings:

  - You are about to drop the `Coverage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_coverage_id_fkey";

-- DropTable
DROP TABLE "Coverage";

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_in_cents" INTEGER NOT NULL,
    "type" "ItemType" NOT NULL,
    "coverage_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coverages" (
    "id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "coverages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoverageToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoverageToItem_AB_unique" ON "_CoverageToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CoverageToItem_B_index" ON "_CoverageToItem"("B");

-- AddForeignKey
ALTER TABLE "_CoverageToItem" ADD CONSTRAINT "_CoverageToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "coverages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoverageToItem" ADD CONSTRAINT "_CoverageToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
