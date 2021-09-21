const express = require('express');
const router  = express.Router();

const mapQueries = require('../db/mapRouter');

// GET /api/:maps
router.get('/', (req, res) => {
  mapQueries.getMapById()
    .then((router) => {
      // res.render();
      res.json();
    });
});

// GET /api/:maps_id
router.get('/:map_id', (req, res) => {
  mapQueries.getMapById(req.params.map_id)
    .then(() => {
      res.json();
    });
});

module.exports = router;
