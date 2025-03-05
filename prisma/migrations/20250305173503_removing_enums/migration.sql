/*
  Warnings:

  - Changed the type of `avatar` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `flavor` on the `ice_cream_balls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `ice_cream_balls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `ice_cream_cones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `ice_cream_cups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `baseType` on the `ice_creams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "avatar",
ADD COLUMN     "avatar" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ice_cream_balls" DROP COLUMN "flavor",
ADD COLUMN     "flavor" INTEGER NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ice_cream_cones" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ice_cream_cups" DROP COLUMN "size",
ADD COLUMN     "size" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ice_creams" DROP COLUMN "baseType",
ADD COLUMN     "baseType" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Avatar";

-- DropEnum
DROP TYPE "BallFlavor";

-- DropEnum
DROP TYPE "IceCreamBaseType";

-- DropEnum
DROP TYPE "Size";
