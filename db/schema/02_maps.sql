DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE "maps" (
  "id" SERIAL NOT NULL,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "name" VARCHAR(255),
  "longitude" REAL,
  "latitude" REAL,
  "zoom_level" INT,
  "location_key" TEXT,
  "is_deleted" BOOLEAN DEFAULT false,
  "is_public" BOOLEAN,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "users"("id")
);