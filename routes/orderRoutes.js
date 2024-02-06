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

app.get("/getAllOrders", [roleDev], getAllOrders);
app.get("/getOrderByCustomerId",[roleUser], getOrdersByCustomerId)
app.get("/getOrderByProductId/:id",[roleSeller], getOrdersByProductId)
app.get("/getByFields",[roleDev],getOrdersByFields)
app.get("/getByYear/:date",[roleMember], getOrdersByYear)

