const express = require('express');
const router  = express.Router();

const markersRoutes = require("./markers");

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(`SELECT * FROM maps WHERE user_id = $1 AND is_deleted = FALSE;`, [`${req.session.user.user_id}`])
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
      console.log(req.body)
      const {name, longitude, latitude, zoom_level} = req.body;
      db.query(`
      INSERT INTO maps (user_id, name, longitude, latitude, zoom_level)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `, [`${req.session.user.user_id}`, `${name}`, `${longitude}`, `${latitude}`, `${zoom_level}`])
        .then(data => res.json(data.rows[0]))
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:map_id", (req, res) => {
      db.query(`SELECT * FROM maps WHERE id = $1;`, [`${req.params.map_id}`])
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
    .get("/public", (req, res) => {
      db.query(`SELECT * FROM maps WHERE is_public = TRUE;`, [`${req.session.user.user_id}`])
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
    // method-override library
    .put("/:map_id", (req, res) => {
      const {name, longitude, latitude, zoom_level, notes, is_public} = req.body;
      db.query(`
      UPDATE maps
      SET name = $1, longitude = $2, latitude = $3, zoom_level = $4, notes = $5, is_public = $6
      WHERE id = $7
      RETURNING *
      `, [`${name}`, `${longitude}`, `${latitude}`, `${zoom_level}`, `${notes}`, `${is_public}`, `${req.params.map_id}`])
        .then(data => res.json(data.rows[0]))
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .delete("/:map_id", (req, res) => {
      db.query(`
      UPDATE maps
      SET is_deleted = true
      WHERE id = $1
      RETURNING *
      `, [`${req.params.map_id}`])
        .then(data => res.json(data.rows[0]))
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })

    // Nested endpoint for markers
    .use("/", markersRoutes(db));
  return router;
};
