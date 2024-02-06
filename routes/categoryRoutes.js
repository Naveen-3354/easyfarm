const express = require("express");
const app = express.Router();

const {
  getAllCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../service/categoryService");
const { roleDev, roleUser } = require("../middleware/roleAuthorization");

app.get("/",[roleUser], getAllCategory);
app.post("/", [roleDev], addCategory);
app.put("/", [roleDev], updateCategory);
app.delete("/", [roleDev], deleteCategory);

module.exports = app;
