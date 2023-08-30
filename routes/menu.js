const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const dish_controller = require("../controllers/dishController");

// CATEGORY ROUTES

// GET menu Home page
router.get("/", category_controller.index);

// Create
router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);
// Delete
router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);
// Update
router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);

// (Read) GET detail for a category
router.get("/category/:id", category_controller.category_detail);

// GET list for categories
router.get("/categories", category_controller.category_list);

// DISH ROUTES
router.get("/dish/create", dish_controller.dish_create_get);
router.post("/dish/create", dish_controller.dish_create_post);

router.get("/dish/:id/delete", dish_controller.dish_delete_get);
router.post("/dish/:id/delete", dish_controller.dish_delete_post);

router.get("/dish/:id/update", dish_controller.dish_update_get);
router.post("/dish/:id/update", dish_controller.dish_update_post);

router.get("/dish/:id", dish_controller.dish_detail);

router.get("/dishes", dish_controller.dish_list);

module.exports = router;
