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
  .get('/new', (req, res) => {
      res.render('add_director');
    })
  .post('/add', (req, res, next) => {
      if (!req.body.biography) {
        res.render('add_director', {message: "Please complete all fields."});
      }

      let directorToInsert = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        portrait_url: req.body.portrait_url,
        biography: req.body.biography
      };

      db('director')
      .insert(directorToInsert)
      .then(() => {
        res.redirect('/directors');
      }, next)
  })


module.exports = router;
