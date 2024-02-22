const express = require("express");
const app = express.Router();

const {
  getAllOrders,
  getOrdersByCustomerId,
  getOrdersByFields,
  getOrdersByProductId,
  getOrdersByYear,
} = require("../service/ordersService");

const {
  roleDev,
  roleSeller,
  roleUser,
  roleMember
} = require("../middleware/roleAuthorization");

app.get("/getAllOrders", [], getAllOrders);
app.get("/getOrderByCustomerId",[], getOrdersByCustomerId)
app.get("/getOrderByProductId/:id",[], getOrdersByProductId)
app.get("/getByFields",[],getOrdersByFields)
app.get("/getByYear/:date",[], getOrdersByYear)

