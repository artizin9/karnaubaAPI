/*
  Warnings:

  - The `subLocation` column on the `Place` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."SubLocation" AS ENUM ('SEDE', 'PÉ_DA_SERRA', 'VÁRZEA_DA_CRUZ', 'MIRIM', 'GREGÓRIO', 'CONTENDAS', 'TANGENTE');

-- AlterTable
ALTER TABLE "public"."Place" DROP COLUMN "subLocation",
ADD COLUMN     "subLocation" "public"."SubLocation" NOT NULL DEFAULT 'SEDE';
