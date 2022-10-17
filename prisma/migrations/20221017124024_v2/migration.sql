/*
  Warnings:

  - Added the required column `index_of` to the `Product_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_image` ADD COLUMN `index_of` INTEGER NOT NULL;
