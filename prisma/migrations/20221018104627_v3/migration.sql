/*
  Warnings:

  - You are about to alter the column `index_of` on the `product_image` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_category_id_fkey`;

-- AlterTable
ALTER TABLE `product_image` MODIFY `index_of` TINYINT NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Product_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
