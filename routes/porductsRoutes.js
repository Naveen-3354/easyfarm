const express = require("express");
const app = express.Router();

const {
  getActiveProducts,
  getAllproducts,
  createNewProduct,
  updateProduct,
  deleteProducts
} = require("../service/productService");
const {
  roleDev,
  roleSeller
} = require("../middleware/roleAuthorization");

app.get("/:status", getActiveProducts);
app.get("/", [], getAllproducts);
app.post("/dev", [], createNewProduct);
app.put("/:id",[], updateProduct)
app.delete("/:id",[], deleteProducts)

module.exports = app;
