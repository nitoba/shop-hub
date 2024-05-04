-- DropForeignKey
ALTER TABLE "ItemsOnCoverage" DROP CONSTRAINT "ItemsOnCoverage_coverageId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsOnCoverage" DROP CONSTRAINT "ItemsOnCoverage_itemId_fkey";

-- AddForeignKey
ALTER TABLE "ItemsOnCoverage" ADD CONSTRAINT "ItemsOnCoverage_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOnCoverage" ADD CONSTRAINT "ItemsOnCoverage_coverageId_fkey" FOREIGN KEY ("coverageId") REFERENCES "coverages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
