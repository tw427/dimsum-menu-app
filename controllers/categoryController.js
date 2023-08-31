const Category = require("../models/category");
const Dish = require("../models/dish");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numCategories, numDishes] = await Promise.all([
    Category.countDocuments({}).exec(),
    Dish.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Dimsum Menu App",
    category_count: numCategories,
    dish_count: numDishes,
  });
});

// Display list of categories
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).sort({ name: -1 }).exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});
// Details for specific category
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: category detail ${req.params.id}`);
});
// Display category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create GET");
});
// Handle category create on POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category create POST");
});
// Display category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete GET");
});
// Handle category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category delete POST");
});
// Display category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update GET");
});
// Handles category update POST
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: category update POST");
});
