/*
  Warnings:

  - You are about to drop the column `move` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `quoteId` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `testimonialText` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_quoteId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "move",
DROP COLUMN "quoteId",
ADD COLUMN     "testimonialText" TEXT NOT NULL;
