-- maps

CREATE TABLE "maps" (
  "id" SERIAL NOT NULL,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "name" VARCHAR(255),
  "longitude" REAL,
  "latitude" REAL,
  "zoom_level" INT,
  "locatiion_key" TEXT,
  "is_deleted" BOOLEAN,
  "is_public" BOOLEAN,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_maps.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
);
