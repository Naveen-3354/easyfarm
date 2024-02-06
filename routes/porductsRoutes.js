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
app.get("/", [roleDev], getAllproducts);
app.post("/dev", [roleSeller], createNewProduct);
app.put("/:id",[roleSeller], updateProduct)
app.delete("/:id",[roleSeller], deleteProducts)

module.exports = app;
