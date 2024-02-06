const express = require("express");
const app = express.Router();

const {
  getAllCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../service/categoryService");
const { admin, developer } = require("../service/productService");

app.get("/", getAllCategory);
app.post("/", [admin, developer], addCategory);
app.put("/", [admin, developer], updateCategory);
app.delete("/", [admin, developer], deleteCategory);

module.exports = app;
