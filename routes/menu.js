const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const dish_controller = require("../controllers/dishController");

// CATEGORY ROUTES

// GET menu Home page
router.get("/", category_controller.index);

// Create
router.get("/categories/create", category_controller.category_create_get);
router.post("/categories/create", category_controller.category_create_post);
// Delete
router.get("/categories/:id/delete", category_controller.category_delete_get);
router.post("/categories/:id/delete", category_controller.category_delete_post);
// Update
router.get("/categories/:id/update", category_controller.category_update_get);
router.post("/categories/:id/update", category_controller.category_update_post);

// (Read) GET detail for a category
router.get("/categories/:id", category_controller.category_detail);

// GET list for categories
router.get("/categories", category_controller.category_list);

// DISH ROUTES
router.get("/dishes/create", dish_controller.dish_create_get);
router.post("/dishes/create", dish_controller.dish_create_post);

router.get("/dishes/:id/delete", dish_controller.dish_delete_get);
router.post("/dishes/:id/delete", dish_controller.dish_delete_post);

router.get("/dishes/:id/update", dish_controller.dish_update_get);
router.post("/dishes/:id/update", dish_controller.dish_update_post);

router.get("/dishes/:id", dish_controller.dish_detail);

router.get("/dishes", dish_controller.dish_list);

module.exports = router;
