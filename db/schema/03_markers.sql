DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE `markers` (
  `id` SERIAL NOT NULL,
  `user_id` INT REFERENCES users(id) ON DELETE CASCADE,
  `map_id` INT REFERENCES maps(id) ON DELETE CASCADE,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`map_id`) REFERENCES `maps`(`id`)
);
