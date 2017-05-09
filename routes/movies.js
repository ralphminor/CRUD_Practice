var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var db = require('../db/db.js')

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .get('/', (req, res, next) => {
    db('movie')
    .innerJoin('movie_director', 'movie_director.movie_id', '=', 'movie.id')
    .innerJoin('director', 'director.id', '=', 'movie_director.director_id')
    .orderBy('title', 'asc')
    .then((movies) => {
      let movies_with_directors = assemble_directors(movies);
      res.render('movies', {
        movies: movies_with_directors })
      }, next)
    })
    .get('/new', (req, res, next) => {
      db('director')
      .then((directors) => {
        directors.forEach((director) => {
          director.full = director.first_name + " " + director.last_name;
        })
        res.render('add_movie', {directors: directors})
        }, next)
      })
    .post('/add', (req, res, next) => {
      if (!req.body.description) {
        res.render('add_movie', {message: "Please complete all fields."});
      }
      let movieToInsert = {
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        poster_url: req.body.poster_url,
        description: req.body.description
      };
      var dir_id = req.body.dir_id;
      var join_obj = {director_id: dir_id, movie_id: ''};

      db('movie')
      .insert(movieToInsert)
      .returning('id')
      .then((id) => {
        join_obj.movie_id = id[0];
      }, next)
      .then(() => {
        db('movie_director')
        .insert(join_obj)
        .then(() => {
          res.redirect('/movies');
        }, next)
      })
    })
    .get('/delete/:id', (req, res, next) => {
      console.log('in delete');
      console.log(req.params.id);
      db('movie')
      .where("movie.id", '=', req.params.id)
      .innerJoin('movie_director', 'movie_director.movie_id', '=', 'movie.id')
      .innerJoin('director', 'director.id', '=', 'movie_director.director_id')
      .then((movies) => {
        let movies_with_directors = assemble_directors(movies);
        res.render('del_movie', {
          movies: movies_with_directors })
        }, next)
      })
    .post('/delete/:id', (req, res, next) => {
      const { id } = req.params;
      db("movie_director")
      .where("movie_director.movie_id", "=", id)
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
    .get('/edit/:id', (req, res, next) => {
      console.log('in edit');
      console.log(req.params.id);
      db('movie')
      .where("movie.id", '=', req.params.id)
      .innerJoin("movie_director", function() {
        this.on('movie_director.movie_id', '=', 'movie.id')
      })
      .innerJoin('director', function() {
        this.on('director.id', '=', 'movie_director.director_id')
      })
      .then((movies) => {
        let movies_with_directors = assemble_directors(movies);
        res.render('edit_movie', {
          movies: movies_with_directors })
        }, next)
      })
    .put('/edit/:id', (req, res, next) => {
      const { id } = req.params;
      let movieToInsert = {
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        poster_url: req.body.poster_url,
        description: req.body.description
      };
      var dir_id = req.body.dir_id;
      var join_obj = {director_id: dir_id, movie_id: id};

      db('movie')
      .update(movieToInsert)
      .where("id", id)
      .then((id) => {
      }, next)
      .then(() => {
        db('movie_director')
        .where("movie_director.id", id)
        .update(join_obj)
        .then(() => {
          res.redirect('/movies');
        }, next)
      })
    })



module.exports = router;


function assemble_directors(movies) {
  // Assemble first_name + last_name into just director.
  var newMovies = [];
  var moviesWithDirectors = [];
  movies.forEach((element) => {
    newMovie = {};
    let director = element.first_name + " " + element.last_name;
    newMovie.id = element.movie_id;
    newMovie.title = element.title;
    newMovie.year = element.year;
    newMovie.genre = element.genre;
    newMovie.poster_url = element.poster_url;
    newMovie.description = element.description;
    newMovie.director = director;
    newMovies.push(newMovie);
  });


  // Create new movies object with all directors listed per movie for rendering.
  var finalMovies = [];
  newMovies.forEach((element) => {
    var match = false;
    if (finalMovies.length > 0) {
      for (var i = 0; i < finalMovies.length; i++) {
        if (element.title === finalMovies[i].title) {
          finalMovies[i].director = finalMovies[i].director + ", " + element.director;
          match = true;
        }
      }
      if (match === false) {
        finalMovies.push(element);
      }
    } else {
      finalMovies.push(element);
    }
  })
  return finalMovies;
}
