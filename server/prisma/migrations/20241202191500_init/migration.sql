/*
  Warnings:

  - You are about to drop the column `userName` on the `Account` table. All the data in the column will be lost.
  - Added the required column `username` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "country" TEXT,
    "postal_code" TEXT
);
INSERT INTO "new_Account" ("city", "country", "email", "id", "password", "postal_code", "street") SELECT "city", "country", "email", "id", "password", "postal_code", "street" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
