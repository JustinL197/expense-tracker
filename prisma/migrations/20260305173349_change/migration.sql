/*
  Warnings:

  - You are about to drop the `Expenses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Expenses";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "amount" DECIMAL NOT NULL
);
