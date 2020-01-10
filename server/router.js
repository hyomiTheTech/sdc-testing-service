const router = require("express").Router();
const controller = require("./controller");

router
  .route("/reviews/:id")
  .get(controller.getReviews)
  .put(controller.updateReview)
  .delete(controller.deleteReview);

router.route("/reviews").post(controller.writeReview);

// router
//   .route("/zips/:id")
//   .get(controller.getZips)
//   .put(controller.updateZipcode)
//   .delete(controller.deleteZipcode);

// router.route("/zips").post(controller.writeZip);

module.exports = router;
