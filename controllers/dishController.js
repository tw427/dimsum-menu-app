const Dish = require("../models/dish");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
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
    dish: dish,
    name: dish.name,
    desc: dish.description,
    price: dish.price,
    category: dish.category,
  });
});

// Display Dish create form on GET
exports.dish_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().exec();

  res.render("dish_form", {
    title: "Create Dish",
    categories: allCategories,
  });
});
// Handle Dish create on POST
exports.dish_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty").trim().isLength({ min: 2 }).escape(),
  body("category", "Category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const dish = new Dish({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      const allCategories = await Category.find().exec();

      for (const category of allCategories) {
        if (dish.category.includes(category._id)) {
          category.checked = "true";
        }
      }

      res.render("dish_form", {
        title: "Create Dish",
        categories: allCategories,
        dish: dish,
        errors: errors.array(),
      });
    } else {
      await dish.save();
      res.redirect(dish.url);
    }
  }),
];
// Display Dish delete form on GET
exports.dish_delete_get = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id).exec();

  if (dish === null) {
    res.redirect("/menu/dishes");
  }

  res.render("dish_delete", {
    title: "Delete Dish",
    dish: dish,
  });
});
// Handle Dish delete on POST
exports.dish_delete_post = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id).exec();

  await Dish.findByIdAndRemove(req.body.dishid);
  res.redirect("/menu/dishes");
});
// Display Dish update form on GET
exports.dish_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish update GET");
});
// Handles Dish update POST
exports.dish_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Dish update POST");
});
