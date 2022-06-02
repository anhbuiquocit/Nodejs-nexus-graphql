/*
  Warnings:

  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deletedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `deletedAt` DATETIME(3) NOT NULL,
    MODIFY `firstname` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;
