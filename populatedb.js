#! /usr/bin/env node

console.log(
  'This script populates dishes, and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Dish = require("./models/dish");
const Category = require("./models/category");

const dishes = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // Populate / Create items for DB
  await createDishes();
  await createCategories();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Entree category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category ${name}`);
}

async function dishCreate(index, name, description, category, price) {
  const dishdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
  };

  const dish = new Dish(dishdetail);
  await dish.save();
  dishes[index] = dish;
  console.log(`Added Dish: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Entree"),
    categoryCreate(1, "Appetizer"),
    categoryCreate(2, "Desert"),
  ]);
}

async function createDishes() {
  console.log("Adding Dishes");
  await Promise.all([
    dishCreate(
      0,
      "BBQ Pork Buns",
      "Honey-glazed oven baked buns with red sweet and savory pork filling",
      categories[0],
      5.99
    ),
    dishCreate(
      1,
      "Sticky Rice",
      "Speckled with bits of chicken, sausage, and mushrooms, this is pretty much everything you love about fried rice, minus the grease, plus gift wrap.",
      categories[0],
      7.99
    ),
    dishCreate(
      2,
      "Soup Dumplings (XLB)",
      "Thinly wrapped dumpling pouches filled with flavor packed soup and pork",
      categories[0],
      6.99
    ),
    dishCreate(
      3,
      "Egg Tart",
      "Miniature pie shaped puff pastries filled with a sweet, soft, bouncy, egg custard center",
      categories[2],
      2.99
    ),
    dishCreate(
      4,
      "Melting Egg Yolk Bun",
      "Baked bun topped with a crumbly sweet egg shell on top, filled with a melty lava like flow of sweet egg custard liquid gold",
      categories[2],
      4.99
    ),
    dishCreate(
      5,
      "Chicken Feet",
      "Black-bean sauce with a complex flavor profile, this Red Chicken Feet is sure to be a homerun for squeemish first timers",
      categories[1],
      4.99
    ),
    dishCreate(
      6,
      "Deep Fried Shrimp Balls",
      "Breaded minced seasoned shrimp dipped and fried in our in-house batter with a sugar cane handle for a touch of sweetness",
      categories[1],
      4.99
    ),
  ]);
}
