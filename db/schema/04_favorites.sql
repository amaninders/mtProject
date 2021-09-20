-- favorites

CREATE TABLE "favourites" (
  "id" SERIAL NOT NULL,
  "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
  "map_id" INT REFERENCES maps(id) ON DELETE CASCADE,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_favourites.user_id"
    FOREIGN KEY ("user_id")
      REFERENCES "users"("id"),
  CONSTRAINT "FK_favourites.map_id"
    FOREIGN KEY ("map_id")
      REFERENCES "maps"("id")
);
