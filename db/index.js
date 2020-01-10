require("dotenv").config();
const { Pool } = require("pg");

module.exports = pgClient = new Pool();

pgClient
  .connect()
  .then(() => {
    console.log("Connected To Postgres!!");
    pgClient.query(`CREATE TABLE IF NOT EXISTS reviews (
      rating int not NULL,
      dateS varchar(50),
      title varchar(255) not null,
      review varchar(500) not null,
      dateP varchar(50),
      author varchar(50) not null,
      aLocation varchar(50),
      ownerR varchar(500),
      ListingId int not Null,
      zipcode varchar(25) not null
    );`);
  })
  .catch(error => {
    console.log(error);
  });

/*
  Creating index commands

  create index idx_reviews_listingid on reviews(listingid);
  create index idx_zips_listingid on zips(listingid);
*/
//
