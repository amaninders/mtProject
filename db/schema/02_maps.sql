-- maps

CREATE TABLE "maps" (
  "id" SERIAL NOT NULL,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "name" VARCHAR(255),
  "longitude" REAL,
  "latitude" REAL,
  "zoom_level" INT DEFAULT '8',
  "locatiion_key" TEXT DEFAULT NULL,
  "is_deleted" BOOLEAN DEFAULT FALSE,
  "is_public" BOOLEAN DEFAULT FALSE,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_maps.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
);
