const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Entree", "Appetizer", "Desert"],
  },
});

CategorySchema.virtual("url").get(function () {
  return `/menu/categories/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
