/*
  Warnings:

  - You are about to drop the `_CoverageToItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoverageToItem" DROP CONSTRAINT "_CoverageToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoverageToItem" DROP CONSTRAINT "_CoverageToItem_B_fkey";

-- DropTable
DROP TABLE "_CoverageToItem";

-- CreateTable
CREATE TABLE "ItemsOnCoverage" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "coverageId" TEXT NOT NULL,

    CONSTRAINT "ItemsOnCoverage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemsOnCoverage" ADD CONSTRAINT "ItemsOnCoverage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnCoverage" ADD CONSTRAINT "ItemsOnCoverage_coverageId_fkey" FOREIGN KEY ("coverageId") REFERENCES "coverages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
