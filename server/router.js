const router = require("express").Router();
const controller = require("./controller");

router
  .route("/reviews/:id")
  .get(controller.getReviews)
  .put(controller.updateReview)
  .delete(controller.deleteReview);

router.route("/reviews").post(controller.writeReview);

module.exports = router;
