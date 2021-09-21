DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE "markers" (
  "id" SERIAL NOT NULL,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "map_id" INT REFERENCES maps(id) ON DELETE CASCADE,
  "longitude" REAL,
  "latitude" REAL,
  "type" VARCHAR(50),
  "notes" TEXT,
  "is_deleted" BOOLEAN DEFAULT false,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_markers.map_id"
    FOREIGN KEY ("map_id")
      REFERENCES "maps"("id"),
  CONSTRAINT "FK_markers.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id")
);