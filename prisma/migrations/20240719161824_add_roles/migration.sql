-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('EDITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'EDITOR';
