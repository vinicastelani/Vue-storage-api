const mongoose = require("../database");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: this.amount * this.value,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
