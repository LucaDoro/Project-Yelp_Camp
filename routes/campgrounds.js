if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../helpers/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Campground = require("../models/campground");

//? req.files is now populated with the uploaded files coming from cloudinary
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));
// to ensure not getting in via Postman post route and creating campground without logging in

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
