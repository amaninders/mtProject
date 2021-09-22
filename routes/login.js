const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session.user = { "user_id": 1, "email": "iprendeguest0@squarespace.com" };
    // Needs jQuery to prevent default
    res.status(201).send();
  });
  return router;
};
