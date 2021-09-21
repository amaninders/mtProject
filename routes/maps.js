const express = require('express');
const router  = express.Router();


const usersRouter = (db) => {
  // GET /api/maps/
app.get('/', (req, res) => {
  db.query(`SELECT * FROM users;`)
  .then((respose) => {
    res.json(respond.rows);
  });

});
// GET /api/:maps_id
router.get('/:maps_id', (req,res) => {
  db.query(`SELECT * FROM posts WHERE id = $1;`, [req.params.maps_id])
      .then((response) => {
        res.json(response.rows[0]);
      });
  });
// return the router

return router;

};
module.exports = usersRouter;
