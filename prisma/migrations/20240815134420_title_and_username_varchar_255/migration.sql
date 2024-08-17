/*
  Warnings:

  - You are about to alter the column `title` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `title` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(100) NOT NULL;
