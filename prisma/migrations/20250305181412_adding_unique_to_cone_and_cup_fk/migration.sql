/*
  Warnings:

  - A unique constraint covering the columns `[iceCreamId]` on the table `ice_cream_cones` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iceCreamId]` on the table `ice_cream_cups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ice_cream_cones_iceCreamId_key" ON "ice_cream_cones"("iceCreamId");

-- CreateIndex
CREATE UNIQUE INDEX "ice_cream_cups_iceCreamId_key" ON "ice_cream_cups"("iceCreamId");
