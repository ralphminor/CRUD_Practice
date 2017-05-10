require("dotenv").load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_db'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + "?ssl=true"
  }

};
