-- CreateEnum
CREATE TYPE "data_type" AS ENUM ('int', 'float', 'string', 'boolean');

-- CreateTable
CREATE TABLE "habits" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data_type" "data_type" NOT NULL,
    "is_hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit_records" (
    "id" SERIAL NOT NULL,
    "habit_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value_int" INTEGER,
    "value_float" DOUBLE PRECISION,
    "value_string" TEXT,
    "value_boolean" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habit_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "habits_user_idx" ON "habits"("user");

-- CreateIndex
CREATE INDEX "habit_records_habit_id_idx" ON "habit_records"("habit_id");

-- CreateIndex
CREATE INDEX "habit_records_date_idx" ON "habit_records"("date");

-- AddForeignKey
ALTER TABLE "habit_records" ADD CONSTRAINT "habit_records_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
