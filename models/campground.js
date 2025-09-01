const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

//? A virtual is a property that is not stored in MongoDB.
//? Virtuals are typically used for computed properties on documents
//? Getting access to .url with image.thumbnail in edit.ejs when deleting an image.
//? Virtual assigns a keyword (thumbnail) to the returned value which is then accessed with image.thumbnail (see edit.ejs)

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//? Middleware to delete all reviews associated with the campground when campground is deleted
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  //? If there are reviews associated with the campground, delete them
  if (doc) {
    //? Delete all reviews associated with the campground
    await Review.deleteMany({
      //? Find all reviews where the _id is in the doc.reviews array
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
