/*
  Warnings:

  - Changed the type of `avatar` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('small', 'medium', 'big');

-- CreateEnum
CREATE TYPE "IceCreamBaseType" AS ENUM ('Cone', 'Cup');

-- CreateEnum
CREATE TYPE "BallFlavor" AS ENUM ('chocolate', 'vanilla');

-- CreateEnum
CREATE TYPE "Avatar" AS ENUM ('AfroBusinessMan', 'AfroBusinessWoman', 'AfroFemaleFarmer', 'AfroFemaleGraduatedStudent', 'AfroFemaleScientist', 'AfroMaleFarmer', 'AfroMaleGraduatedStudent', 'AfroMaleScientist', 'AfroMan', 'AfroOldBusinessMan', 'AfroOldBusinessWoman', 'AfroOldFemaleFarmer', 'AfroOldMaleFarmer', 'AfroOldMan', 'AfroOldSportMan', 'AfroOldSportWoman', 'AfroSportMan', 'AfroSportWoman', 'AfroWoman', 'AfroYoungMan', 'AfroYoungWoman', 'AsianOldMan', 'AsianOldWoman', 'AsianYoungWoman', 'BusinessMan', 'BusinessWoman', 'Clown', 'Criminal', 'FemaleFarmer', 'FemaleGraduatedStudent', 'FemaleScientist', 'FireFighter', 'Hoodie', 'IndianWoman', 'MaleArtist', 'MaleFarmer', 'MaleMuslim', 'MaleScientist', 'MuslimMan', 'OldBusinessMan', 'OldBusinessWoman', 'OldFemaleFarmer', 'OldMaleFarmer', 'OldMan', 'OldSportMan', 'OldSportWoman', 'OldWoman', 'PartyMan', 'PartyWoman', 'SportMan', 'SportWoman', 'YoungMan');

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "avatar",
ADD COLUMN     "avatar" "Avatar" NOT NULL;

-- CreateTable
CREATE TABLE "ice_creams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseType" "IceCreamBaseType" NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "ice_creams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ice_cream_balls" (
    "id" TEXT NOT NULL,
    "flavor" "BallFlavor" NOT NULL,
    "size" "Size" NOT NULL,
    "iceCreamId" TEXT NOT NULL,

    CONSTRAINT "ice_cream_balls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ice_cream_cones" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "iceCreamId" TEXT NOT NULL,

    CONSTRAINT "ice_cream_cones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ice_cream_cups" (
    "id" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "iceCreamId" TEXT NOT NULL,

    CONSTRAINT "ice_cream_cups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ice_creams" ADD CONSTRAINT "ice_creams_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ice_cream_balls" ADD CONSTRAINT "ice_cream_balls_iceCreamId_fkey" FOREIGN KEY ("iceCreamId") REFERENCES "ice_creams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ice_cream_cones" ADD CONSTRAINT "ice_cream_cones_iceCreamId_fkey" FOREIGN KEY ("iceCreamId") REFERENCES "ice_creams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ice_cream_cups" ADD CONSTRAINT "ice_cream_cups_iceCreamId_fkey" FOREIGN KEY ("iceCreamId") REFERENCES "ice_creams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
