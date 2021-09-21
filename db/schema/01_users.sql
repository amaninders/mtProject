DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "id" SERIAL NOT NULL,
  "email" VARCHAR (255),
  "password" VARCHAR (255),
  PRIMARY KEY ("id")
);
