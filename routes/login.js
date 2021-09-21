const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE id = 1;`)
      .then(data => {
        const exampleUser = data.rows[0];
        req.sessions.user = { "user_id": exampleUser.id, "email": exampleUser.emailß }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
