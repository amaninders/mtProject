const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(`SELECT * FROM favourites LEFT JOIN maps on favourites.map_id = maps.id WHERE maps.user_id = $1`, [`${req.session.user.user_id}`])
        .then(data => {
          const maps = data.rows;
          res.json({ maps });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .post("/", (req, res) => {
      db.query(`
      INSERT INTO favourites (user_id, map_id)
      VALUES ($1, $2)
      RETURNING *
      `, [`${req.session.user.user_id}`, `${req.body.map_id}`])
        .then(data => {
          const fav = data.rows[0];
          res.json({ fav });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    // method-override library
    .delete("/:map_id", (req, res) => {
      db.query(`
      DELETE FROM favourites
      WHERE user_id = $1, map_id = $2
      RETURNING *
      `, [`${req.session.user.user_id}`, `${req.body.map_id}`])
        .then(data => {
          const deleted = data.rows[0];
          res.json({ deleted });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
  router


  return router;
};
