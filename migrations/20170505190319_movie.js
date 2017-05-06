exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie', function(movie) {
    movie.increments('id').primary();
    movie.string('title');
    movie.string('genre');
    movie.string('description', 1000);
    movie.string('poster_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movie');
};
