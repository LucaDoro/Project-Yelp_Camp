//? Joi validation for Campground data
const { campgroundSchema, reviewSchema } = require("./schemas.js");

const ExpressError = require("./helpers/ExpressError");
const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  //? (req.user) user information stored in session
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};

//? By using the storeReturnTo middleware function,
//? we can save the returnTo value to res.locals before
//? passport.authenticate() clears the session and deletes req.session.returnTo.
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

//? Function that wraps (like catchAsync()), on select incoming requests (Post, Put and Patch)
module.exports.validateCampground = (req, res, next) => {
  //? Pass data though the Schema
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    //* If validation failed
    //? map over object to extract .message and join() it
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    //* If validation passed
    next();
  }
};

//? Middleware to check if the user is the author of the campground
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  //? Looking if users id (who's logged in) is equal to the campground author id
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

//? Middleware to check if the user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  //? Looking if users id (who's logged in) is equal to the review author id
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
