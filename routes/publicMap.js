const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router
    .get("/:map_id", (req, res) => {
      db.query(`
      SELECT *
      FROM maps
      WHERE id = $1 AND is_public = true;
      ;`, [`${req.params.map_id}`])
        .then(data => {
          const map = data.rows[0]
          res.set('Wikimap-Data', JSON.stringify(map));
          res.redirect('../..');
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    })
    .post("/:map_id", (req, res) => {
      // Map can only be shared using front-end
      if (req.get('Sec-Fetch-Site') !== 'same-site') {
        return res.status(403).send('Access restricted');
      }

      const { email, phone } = req.body;

      // } else {
      //   console.log('Internal');
      //   res.status(200).send('');
      // }

    })

  return router
}
