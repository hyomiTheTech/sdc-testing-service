// random data libraries
const faker = require("faker");
var moment = require("moment");
var zipcodes = require("zipcodes");

// for PostgresSql
const pgClient = require("./index");

// modules for creating csv
const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "reviews.csv");
var output = ``;

const writeReviews = fs.createWriteStream(filename);
writeReviews.write(output, "utf8");

genReview = (writer, encoding, callback) => {
  var randZips = [];

  for (let z = 0; z < 500; z++) {
    randZips.push(zipcodes.random().zip);
  }

  let randLoc, date;
  let locationProb = [1, 2, 3];
  let j = 10000001;
  let k = 0;
  let turn = true;
  var write = () => {
    let ok = true;
    do {
      j--;
      let randRev = Math.floor(Math.random() * 3) + 1;
      if (j % 10000 === 0) {
        console.log(j + " Reviews Written");
      }
      var zipCode = randZips[Math.floor(Math.random() * 501)];
      for (let i = 0; i < randRev; i++) {
        let randNums = Math.random();
        randOwn = Math.floor(randNums * 11);
        randLoc = Math.floor(randNums * 4);
        date = faker.date.between("2005-2-1", "2019-12-7");
        stringDate = JSON.stringify(date);

        var rating = Math.floor(randNums * 5);
        var dateS = stringDate;
        var title = faker.lorem.sentence();
        var review = faker.lorem.paragraph();
        if (locationProb[randLoc] === 2) {
          var dateP = moment(date).add(1, "M");
        } else {
          var dateP = stringDate;
        }
        var author = faker.name.findName();
        var ownerR = faker.lorem.paragraph();
        var aLocation = `"${faker.address.city()}, ${faker.address.stateAbbr()}"`;
        var ListingId = j;

        var data = `${rating},${dateS},${title},${review},${dateP},"${author}",${aLocation},${ownerR},${ListingId},${zipCode}\n`;

        if (j === 1) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (j > 1 && ok);
    if (j > 1) {
      writer.once("drain", write);
    }
  };
  write();
};

genReview(writeReviews, "utf-8", () => {
  writeReviews.end(err => {
    if (err) {
      console.log(err);
    } else {
      pgClient
        .query(
          `COPY reviews FROM '/Users/EuiHyo_Mi/Desktop/sdc-testing-service/db/reviews.csv' DELIMITER ',' CSV`
        )
        .then(() => {
          pgClient.query(`ALTER TABLE reviews ADD id serial;`);
          console.log("Successfully written reviews!");
          // pgClient.end();
        })
        .then(() => {
          pgClient.query(
            `create index idx_reviews_listingid on reviews(listingid);`
          );
          console.log("Index on listingid created!!");
        })
        .then(() => {
          pgClient.query(`create index idx_reviews_id on reviews(id);`);
          console.log("Index on id created!!");
        })
        .catch(err => {
          throw err;
        });
    }
  });
});

// const zipCodeFile = path.join(__dirname, "zips.csv");
// var zipCodes = ``;

// const writeZipCodes = fs.createWriteStream(zipCodeFile);
// writeZipCodes.write(zipCodes, "utf8");

// genLocations = (writer, encoding, callback) => {
//   var randZips = [];

//   for (let z = 0; z < 200; z++) {
//     randZips.push(zipcodes.random().zip);
//   }

//   let i = 10001;

//   var writeZip = () => {
//     let ok = true;
//     do {
//       i--;
//       if (i % 100000 === 0) {
//         console.log(i + " zipCodes Written");
//       }
//       const zipCode = randZips[Math.floor(Math.random() * 201)];
//       const ListingId = i;
//       const zips = `${zipCode},${ListingId}\n`;
//       if (i === 1) {
//         writer.write(zips, encoding, callback);
//       } else {
//         ok = writer.write(zips, encoding);
//       }
//     } while (i > 1 && ok);
//     if (i > 1) {
//       writer.once("drain", writeZip);
//     }
//   };
//   writeZip();
// };

// genLocations(writeZipCodes, "utf-8", () => {
//   writeZipCodes.end(err => {
//     if (err) {
//       console.log(err);
//     } else {
//       pgClient
//         .query(
//           `COPY zips FROM '/Users/EuiHyo_Mi/Desktop/sdc-service-david/db/postgresDB/zips.csv' DELIMITER ',' CSV`
//         )
//         .then(() => {
//           pgClient.query(`ALTER TABLE zips ADD id serial;`);
//           console.log("Successfully written zipcodes!");
//         })
//         .then(() => {
//           pgClient.query(`create index idx_zips_listingid on zips(listingid);`);
//           console.log("Index created!!");
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   });
// });
