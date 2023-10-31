/*
  Warnings:

  - Added the required column `created_at` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_at` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_at` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Match` ADD COLUMN `created_at` BIGINT NOT NULL,
    ADD COLUMN `modified_at` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `Move` ADD COLUMN `created_at` BIGINT NOT NULL,
    ADD COLUMN `modified_at` BIGINT NOT NULL;
