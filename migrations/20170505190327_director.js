exports.up = function(knex, Promise) {
  return knex.schema.createTable('director', function(director) {
    director.increments('id').primary();
    director.string('first_name');
    director.string('last_name');
    director.string('biography', 1000);
    director.string('portrait_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('director');
};
