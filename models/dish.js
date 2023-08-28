const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DishSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true, maxLength: 255 },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  price: { type: Number, required: true },
});

DishSchema.virtual("url").get(function () {
  return `/menu/dish/${this._id}`;
});

module.exports = mongoose.model("Dish", DishSchema);
