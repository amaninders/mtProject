-- Drop and recreate Users table (Example)

CREATE TABLE "users" (
  "id" SERIAL NOT NULL,
  "email" VARCHAR (255),
  "password" VARCHAR (255),
  PRIMARY KEY ("id")
);
