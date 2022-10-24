-- DropForeignKey
ALTER TABLE `product_category` DROP FOREIGN KEY `Product_category_parent_category_id_fkey`;

-- AddForeignKey
ALTER TABLE `Product_category` ADD CONSTRAINT `Product_category_parent_category_id_fkey` FOREIGN KEY (`parent_category_id`) REFERENCES `Product_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
