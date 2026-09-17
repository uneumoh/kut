/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,length,texture,color]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`;

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_length_texture_color_key` ON `Product`(`name`, `length`, `texture`, `color`);
