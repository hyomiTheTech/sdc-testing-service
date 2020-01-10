const db = require("../db/index");

module.exports = {
  getReviews: (req, res) => {
    // console.log("its hitting here!", req.params.id);
    db.query(`SELECT * FROM reviews where listingid='${req.params.id}';`)
      .then(data => {
        res.status(200).send(data.rows);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  // getZips: (req, res) => {
  //   // console.log("its hitting here!", req.params.id);
  //   db.query(`SELECT * FROM zips where listingid=${req.params.id};`)
  //     .then(data => {
  //       res.status(200).send(data);
  //     })
  //     .catch(err => {
  //       res.status(404).send(err);
  //     });
  // },
  writeReview: (req, res) => {
    db.query(
      `INSERT INTO reviews (rating,dateS,title,review,dateP,author,aLocation,ownerR,ListingId) VALUES ('${req.body.rating}', '${req.body.dateS}', '${req.body.title}', '${req.body.review}', '${req.body.dateP}', '${req.body.author}', '${req.body.aLocation}', '${req.body.ownerR}', '${req.body.ListingId}');`
    )
      .then(() => {
        res.status(200).send("Review has been written!!");
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  // writeZip: (req, res) => {
  //   db.query(
  //     `INSERT INTO zips (zipcode, ListingId) VALUES ('${req.body.zipcode}', '${req.body.ListingId}');`
  //   )
  //     .then(() => {
  //       res.status(200).send("Zipcodes has been written!!");
  //     })
  //     .catch(err => {
  //       res.status(404).send(err);
  //     });
  // },
  updateReview: (req, res) => {
    db.query(
      `UPDATE reviews SET rating='${req.body.rating}', dateS='${req.body.dateS}', title='${req.body.title}', review='${req.body.review}', dateP='${req.body.dateP}', author='${req.body.author}', aLocation='${req.body.aLocation}', ownerR='${req.body.ownerR}', ListingId='${req.body.ListingId}' WHERE id='${req.params.id}';`
    )
      .then(() => {
        res.status(200).send("Review has been updated!");
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  // updateZipcode: (req, res) => {
  //   db.query(
  //     `UPDATE zips SET zipcode='${req.body.zipcode}', ListingId='${req.body.ListingId}' WHERE id='${req.params.id}';`
  //   )
  //     .then(() => {
  //       res.status(200).send("Zipcodes has been updated!!");
  //     })
  //     .catch(err => {
  //       res.status(404).send(err);
  //     });
  // },
  deleteReview: (req, res) => {
    db.query(`DELETE FROM reviews WHERE id='${req.params.id}';`)
      .then(() => {
        res.status(200).send("Review has been deleted!!");
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
  // deleteZipcode: (req, res) => {
  //   db.query(`DELETE FROM zips WHERE id='${req.params.id}';`)
  //     .then(() => {
  //       res.status(200).send("Zipcodes has been deleted!!");
  //     })
  //     .catch(err => {
  //       res.status(404).send(err);
  //     });
  // }
};
