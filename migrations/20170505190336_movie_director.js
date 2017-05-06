exports.up = function(knex, Promise) {
  return knex.schema.createTable('movie_director', function(movie_director) {
    movie_director.increments('id').primary();
    movie_director.integer('movie_id').references('id').inTable('movie');
    movie_director.integer('director_id').references('id').inTable('director');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movie_director');
};
