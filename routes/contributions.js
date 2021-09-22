const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(`
      SELECT maps.*
      FROM maps
      JOIN markers ON maps.id = map_id
      WHERE markers.user_id = $1
      AND maps.user_id <> $1
      `, [`${req.session.user.user_id}`])
        .then(data => {
          const contributions = data.rows;
          res.json({ contributions });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });

  return router;
}
