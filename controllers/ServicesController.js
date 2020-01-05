const express = require("express");
const router = express.Router();
const ServicesController = require("../models/Services")

router.get("/services", (req, res)=>{
  ServicesController.find({})
	.then(services => {
	  res.send(services);
	});
});
router.get("/service/:url", (req, res)=> {
  ServicesController.findOne({url: req.params.url})
	.then(services => {
	  res.send(services);
	});
});
router.put("/service/:url", (req, res)=>{
  console.log(req.body)
  ServicesController.findOneAndUpdate({url: req.params.url}, req.body)
	.then(() => {
	  ServicesController.findOne({url: req.params.url})
		.then(services => {
		  res.send(services);
		});
	});
});

module.exports = router;