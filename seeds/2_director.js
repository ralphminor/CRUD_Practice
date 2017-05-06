
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('director').del()
    .then(function () {
      const director_obj = [{
        first_name: 'Quentin',
        last_name: 'Tarantino',
        biography: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.',
        portrait_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_SY1000_CR0,0,651,1000_AL_.jpg'
      },
      {
        first_name: 'Steven',
        last_name: 'Spielberg',
        biography: 'Undoubtedly one of the most influential film personalities in the history of film, Steven Spielberg is perhaps Hollywood\'s best known director and one of the wealthiest filmmakers in the world. Spielberg has countless big-grossing, critically acclaimed credits to his name, as producer, director and writer.',
        portrait_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1NjAzNzE1MV5BMl5BanBnXkFtZTYwNTk0ODc0._V1_.jpg'
      },
      {
        first_name: 'Sergio',
        last_name: 'Leone',
        biography: 'Sergio Leone was virtually born into the cinema - he was the son of Roberto Roberti (A.K.A. Vincenzo Leone), one of Italy\'s cinema pioneers, and actress Bice Valerian. Leone entered films in his late teens, working as an assistant director to both Italian directors and U.S. directors working in Italy (usually making Biblical and Roman epics, much in vogue at the time). Towards the end of the 1950s he started writing screenplays, and began directing after taking over The Last Days of Pompeii (1959) in mid-shoot after its original director fell ill.',
        portrait_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4Njk5MzY3MV5BMl5BanBnXkFtZTcwMTEyMzE0NA@@._V1_SY1000_CR0,0,707,1000_AL_.jpg'
      },
      {
        first_name: 'Andrew',
        last_name: 'Niccol',
        biography: 'New Zealand-born screenwriter-director Andrew Niccol began his career in London, successfully directing TV commercials before moving to Los Angeles in order to make films \"longer than 60 seconds.\"',
        portrait_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI5ODQ2ODU2M15BMl5BanBnXkFtZTcwNjM2NDg5Mg@@._V1_.jpg'
      },
      {
        first_name: 'James L.',
        last_name: 'Brooks',
        biography: 'James L. Brooks was born on May 9, 1940 in Brooklyn, New York, USA. He is a writer and producer, known for The Simpsons (1989), The Simpsons Movie (2007) and As Good as It Gets (1997).',
        portrait_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjYzNzc2MDg4MV5BMl5BanBnXkFtZTYwMTA2ODQz._V1_.jpg'
      }]
      return knex('director').insert(director_obj);
    });
};
