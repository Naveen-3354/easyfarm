const express = require("express");
const app = express.Router();

const {
  getAllCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../service/categoryService");
const { roleDev, roleUser } = require("../middleware/roleAuthorization");

app.get("/",[], getAllCategory);
app.post("/", [], addCategory);
app.put("/", [], updateCategory);
app.delete("/", [], deleteCategory);

module.exports = app;
