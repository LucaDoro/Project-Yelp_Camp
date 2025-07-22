const express = require("express");
const router = express.Router({ mergeParams: true }); // Fixing req.params issues, bcs /campgrounds/:id is in campgrounds.js file
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const Campground = require("../models/campground");
const Review = require("../models/review.js");
const reviews = require("../controllers/reviews.js");

const catchAsync = require("../helpers/catchAsync");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
