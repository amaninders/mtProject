const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router
    .get("/:map_id/markers", (req, res) => {
      db.query(`SELECT * FROM markers WHERE map_id = $1;`, [req.params.map_id])
        .then(data => {
          const markers = data.rows;
          res.json({ markers });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .post("/:map_id/markers", (req, res) => {
      const {name, longitude, latitude, type, notes} = req.body;
      db.query(`
      INSERT INTO markers (user_id, map_id, name, longitude, latitude, type, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `, [`${req.session.user.user_id}`, `${req.params.map_id}`, `${name}`, `${longitude}`, `${latitude}`, `${type}`, `${notes}`])
        .then(data => {
          const markers = data.rows;
          res.json({ markers });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .get("/:map_id/markers/:marker_id", (req, res) => {
      db.query(`SELECT * FROM markers WHERE id = $1 AND map_id = $2;`, [`${req.params.marker_id}`, `${req.params.map_id}`])
        .then(data => {
          const markers = data.rows;
          res.json({ markers });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    // method-override library
    .put("/:map_id/markers/:marker_id", (req, res) => {
      const {longitude, latitude, type, notes} = req.body;
      db.query(`
      UPDATE markers
      SET longitude = $1, latitude = $2, type = $3, notes = $4
      WHERE id = $5 AND map_id = $6
      RETURNING *
      `, [`${longitude}`, `${latitude}`, `${type}`, `${notes}`, `${req.params.marker_id}`, `${req.params.map_id}`])
        .then(data => data.rows[0])
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .delete("/:map_id/markers/:marker_id", (req, res) => {
      db.query(`
      UPDATE markers
      SET is_deleted = true
      WHERE id = $1 AND map_id = $2
      RETURNING *
      `, [`${req.params.marker_id}`, `${req.params.map_id}`])
        .then(data => data.rows[0])
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })

  return router;
};
