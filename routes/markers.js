const express = require('express');
const router  = express.Router();

const usersMarker = (db) => {
  // GET /api/markers/
app.get('/', (req, res) => {
  db.query(`SELECT * FROM markers;`)
  .then((respose) => {
    res.json(response.rows);
  })
  .catch((err) => console.log(err.message))

});
// GET /api/:markers_id
router.get('/:maps_id/markers', (req,res) => {
  db.query(`SELECT * FROM posts WHERE id = $1;`, [req.params.maps_id])
      .then((response) => {
        res.json(response.rows[0]);
      })
      .catch((err) => console.log(err.message))

  });
// return the router

return router;

//



};
module.exports = usersMarker;
