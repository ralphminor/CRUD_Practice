module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_db'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
