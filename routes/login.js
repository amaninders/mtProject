const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session.user = { "user_id": 1, "email": "iprendeguest0@squarespace.com" };
    templateVars = {
      username: req.session.user.user_id,
      email: req.session.user.email
    }
    // Needs jQuery to prevent default
    res.status(201);
    res.render("index",templateVars);
  });
  return router;
};
