const express = require("express");
const router = express.Router();
const ReviewsController = require("../models/Reviews");

router.get("/reviews", (req, res)=>{
  ReviewsController.find({})
	.then(reviews => {
	  res.send(reviews);
	});
});


module.exports = router;