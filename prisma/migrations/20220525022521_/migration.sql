-- AlterTable
ALTER TABLE `User` MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `deletedAt` DATETIME(3) NULL,
    MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;