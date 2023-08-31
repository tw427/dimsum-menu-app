const Dish = require("../models/dish");
// const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// Display list of Dishes
exports.dish_list = asyncHandler(async (req, res, next) => {
  const allDishes = await Dish.find({}, "name price").sort({ name: 1 }).exec();

  res.render("dish_list", { title: "Dish List", dish_list: allDishes });
});
// Details for specific Dish
exports.dish_detail = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id).populate("category").exec();

  if (dish === null) {
    const err = new Error("Dish not found");
    err.status = 404;
    return next(err);
  }

  res.render("dish_detail", {
    name: dish.name,
    desc: dish.description,
    price: dish.price,
    category: dish.category,
  });
});

// Display Dish create form on GET
exports.dish_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish create GET");
});
// Handle Dish create on POST
exports.dish_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish create POST");
});
// Display Dish delete form on GET
exports.dish_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish delete GET");
});
// Handle Dish delete on POST
exports.dish_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish delete POST");
});
// Display Dish update form on GET
exports.dish_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish update GET");
});
// Handles Dish update POST
exports.dish_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish update POST");
});
