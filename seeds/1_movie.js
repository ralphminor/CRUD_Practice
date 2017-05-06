
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movie').del()
    .then(function () {
      const movie_obj = [{
        title: 'Saving Private Ryan',
        year: 1998,
        genre: 'War',
        description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
        poster_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SY1000_CR0,0,679,1000_AL_.jpg'
      },
      {
        title: 'The Good, the Bad and the Ugly',
        year: 1966,
        genre: 'Western',
        description: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
        poster_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SY1000_CR0,0,656,1000_AL_.jpg'
      },
      {
        title: 'Gattaca',
        year: 1997,
        genre: 'Sci-Fi',
        description: 'A genetically inferior man assumes the identity of a superior one in order to pursue his lifelong dream of space travel.',
        poster_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDQxOTc0MzMtZmRlOS00OWQ5LWI2ZDctOTAwNmMwOTYxYzlhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
      },
      {
        title: 'Pulp Fiction',
        year: 1994,
        genre: 'Crime',
        description: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        poster_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SY1000_CR0,0,673,1000_AL_.jpg'
      },
      {
        title: 'As Good as It Gets',
        year: 1997,
        genre: 'Drama',
        description: 'A single mother/waitress, a misanthropic author, and a gay artist form an unlikely friendship after the artist is assaulted in a robbery.',
        poster_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNWMxZTgzMWEtMTU0Zi00NDc5LWFkZjctMzUxNDIyNzZiMmNjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
      },
      {
        title: 'Reservoir Dogs',
        year: 1992,
        genre: 'Crime',
        description: 'After a simple jewelry heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.',
        poster_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZmExNmEwYWItYmQzOS00YjA5LTk2MjktZjEyZDE1Y2QxNjA1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
      }]
      return knex('movie').insert(movie_obj);
    });
};
