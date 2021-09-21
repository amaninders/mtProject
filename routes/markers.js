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
      const {longitude, latitude, type,notes} = req.body;
      db.query(`
      INSERT INTO maps (user_id, map_id, longitude, latitude, type, notes)
      VALUES ($1, $2, $3, $4, $5, $6, false, $7)
      RETURNING *
      `, [res.session.user.user_id, req.params.map_id, longitude, latitude, `${type}`, `${notes}`])
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
      db.query(`SELECT * FROM markers WHERE id = $1;`, [req.params.marker_id])
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
      const {longitude, latitude, zoom, locationKey} = req.body;
      db.query(`
      UPDATE markers
      SET longitude = $1, latitude = $2, type = $3, notes = $4
      WHERE id = $5
      RETURNING *
      `, [longitude, latitude, zoom, `${locationKey}`, `${type}`, `${notes}`, req.params.marker_id])
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
      WHERE id = $1
      RETURNING *
      `, [req.params.marker_id])
        .then(data => data.rows[0])
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })

  return router;
};
