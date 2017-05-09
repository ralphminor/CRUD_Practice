var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var db = require('../db/db.js')

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get('/', (req, res, next) => {
    db('director')
    .leftJoin('movie_director', 'director_id', '=', 'director.id')
    .leftJoin('movie', 'movie.id', '=', 'movie_director.movie_id')
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
      db('director')
      .where("director.id", '=', req.params.id)
      .then((directors) => {
        res.render('del_director', {
          directors: directors })
        }, next)
      })
  .post('/delete/:id', (req, res, next) => {
      const { id } = req.params;
      console.log('id before delete = ', id);
      db("movie_director")
      .where('movie_director.director_id', '=', id)
      .then((recs) => {
        console.log('recs = ', recs);
        let movs_to_delete = [];
        let dirs_to_delete = [];
        recs.forEach((e) => {
          movs_to_delete.push(e.movie_id);
          dirs_to_delete.push(e.director_id);
        })
        console.log('movs_to_delete = ', movs_to_delete);
        console.log('dirs_to_delete = ', dirs_to_delete);
        db('movie_director')
        .where('movie_director.director_id', '=', id)
        .del()
        .then(() => {
          console.log('step 1 - deleted from movie_director')
          db('director')
          .where('director.id', '=', id)
          .del()
          .then(() => {
            console.log('step 2 = deleted from director')
            db('movie')
            .whereIn('movie.id', movs_to_delete)
            .del()
            .then(() => {
              console.log('step 3 = deleted from movie')
              res.redirect('/directors');
            })
          })
        })
      }, next)
  })
  .get('/edit/:id', (req, res, next) => {
      db('director')
      .where("director.id", '=', req.params.id)
      .then((director) => {
        res.render('edit_director', {
          directors: director })
        }, next)
      })
  .put('/edit/:id', (req, res, next) => {
      const { id } = req.params;
      let directorToInsert = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        biography: req.body.biography,
        portrait_url: req.body.portrait_url
      };
      db('director')
      .update(directorToInsert)
      .where('id', id)
      .then(() => {
        res.redirect('/directors');
      }, next)
  })


module.exports = router;


function assemble_movies(directors) {
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
  return finalDirectors;
}