var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var db = require('../db/db.js')

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get('/', (req, res, next) => {
    db('director')
    .then((directors) => {
      //let movies_with_directors = assemble_directors(movies);
      res.render('directors', {
        directors: directors })
      }, next)
    })

module.exports = router;
