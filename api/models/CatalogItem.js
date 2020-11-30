const mongoose = require("../database");

const CatalogItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: Math.floor(Math.random() * 1000000000),
  },
  value: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const CatalogItem = mongoose.model("CatalogItem", CatalogItemSchema);
module.exports = CatalogItem;
