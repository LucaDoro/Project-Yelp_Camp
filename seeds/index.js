const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30 + 10);
    const camp = new Campground({
      author: "6876a4abd18172cac8b1f23e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure facere, perspiciatis inventore molestiae minima aspernatur, sed deserunt officia et suscipit non corrupti quam ducimus vel dolorum voluptatum dolorem excepturi eligendi.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dd3fooxfo/image/upload/v1752596760/YelpCamp/ittn7bqcoxkqrridj0ne.jpg",
          filename: "YelpCamp/ittn7bqcoxkqrridj0ne",
        },
        {
          url: "https://res.cloudinary.com/dd3fooxfo/image/upload/v1752596761/YelpCamp/tmkvxi1fjlcbzdpamggb.jpg",
          filename: "YelpCamp/tmkvxi1fjlcbzdpamggb",
        },
      ],
    });
    await camp.save();
  }
};

// run seedDB with random location and title picker, save data, then close database server.
seedDB().then(() => {
  mongoose.connection.close();
});
