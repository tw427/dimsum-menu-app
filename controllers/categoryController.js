const Category = require("../models/category");
const Dish = require("../models/dish");
const { body, validationResult } = require("express-validator");
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
  const [category, dishInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Dish.find({ category: req.params.id }, "name price").exec(),
  ]);

  if (category === null) {
    const err = new Error("Dish not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category detail",
    category: category,
    category_dishes: dishInCategory,
  });
});
// Display category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
});
// Handle category create on POST
exports.category_create_post = [
  // Validate and sanitize fields
  body("category")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Category must be specified"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.category,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];
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
