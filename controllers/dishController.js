const Dish = require("../models/dish");
const asyncHandler = require("express-async-handler");

// Display list of Dishes
exports.dish_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish list");
});
// Details for specific Dish
exports.dish_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Dish detail ${req.params.id}`);
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
