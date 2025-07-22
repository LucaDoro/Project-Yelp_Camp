const Joi = require("joi");

module.exports.campgroundSchema = Joi.object({
  //? Not a mongoose Schema, data is validated before it's saved by mongoose
  //? See new.ejs & .edit.ejs form with name set to campground[price] etc...
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(1),
    // image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required(),
  }).required(),
});
