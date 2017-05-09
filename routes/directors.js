var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var db = require('../db/db.js')

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get('/', (req, res, next) => {
    db('director')
    .innerJoin('movie_director', 'director_id', '=', 'director.id')
    .innerJoin('movie', 'movie.id', '=', 'movie_director.movie_id')
    .orderBy('last_name', 'asc')
    .then((directors) => {
      let directors_with_movies = assemble_movies(directors);
      res.render('directors', {
        directors: directors_with_movies })
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
  .get('/delete/:id', (req, res, next) => {
      console.log('in directors delete');
      console.log(req.params.id);
      db('director')
      .where("director.id", '=', req.params.id)
      .then((directors) => {
        res.render('del_director', {
          directors: directors })
        }, next)
      })
  .post('/delete/:id', (req, res, next) => {
      const { id } = req.params;
      db("movie_director")
      .where("movie_director.director_id", "=", id)
      .delete()
      .then(() => {
        db('movie')
        .where("id", id)
        .delete()
        .then(() => {
          res.redirect('/movies');
        }, next)
      })
    })


module.exports = router;


function assemble_movies(directors) {
  console.log(`Directors = ${directors}`);
  var newDirectors = [];
  var directorsWithMovies = [];
  directors.forEach((element) => {
    newDirector = {};
    let movie = element.title;
    newDirector.id = element.director_id;
    newDirector.first_name = element.first_name;
    newDirector.last_name = element.last_name;
    newDirector.portrait_url = element.portrait_url;
    newDirector.biography = element.biography;
    newDirector.movie = movie;
    newDirectors.push(newDirector);
  });


  // Create new directors object with all directors listed per movie for rendering.
  var finalDirectors = [];
  newDirectors.forEach((element) => {
    var match = false;
    if (finalDirectors.length > 0) {
      for (var i = 0; i < finalDirectors.length; i++) {
        if (element.first_name === finalDirectors[i].first_name && element.last_name  === finalDirectors[i].last_name) {
          finalDirectors[i].movie = finalDirectors[i].movie + ", " + element.movie;
          match = true;
        }
      }
      if (match === false) {
        finalDirectors.push(element);
      }
    } else {
      finalDirectors.push(element);
    }
  })
  console.log(finalDirectors);
  return finalDirectors;
}