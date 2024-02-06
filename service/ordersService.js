const OrderModel = require("../models/orderdsModel");
const ProductModel = require("../models/productsModel");
const _ = require("lodash");

exports.getAllOrders = async (request, response) => {
  const result = await OrderModel.find().select({
    _id: 0,
  });

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Orders fetched successfuly.",
  });
};

exports.getOrdersByCustomerId = async (request, response) => {
  const customerId = request.userId;
  let result = await OrderModel.find({ customerId }).select({
    _id: 0,
    orderId: 1,
    productId: 1,
  });

  for (let values of result) {
    let products = await ProductModel.findOne({ productId: values.productId });
    values[productImg] = products.productImg;
    values.productName = products.productName;
  }

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Orders fetched successfuly.",
  });
};

exports.getOrdersByPrductId = async (request, response) => {
  const productId = request.params.id;
  const result = await OrderModel.find({ productId }).select({
    orderId: 1,
    ProductQuantity: 1,
    totalAmount: 1,
    productId: 1,
    customerId: 1,
    trackingId: 1,
    _id: 0,
  });

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Orders fetched successfuly.",
  });
};

exports.getOrdersByFields = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const {
    orderAddress,
    customerCountry,
    customerState,
    customerPincode,
    customerCity,
  } = request.body;

  const result = await OrderModel.find({
    $or: [
      { orderAddress },
      { customerCity },
      { customerPincode },
      { customerState },
      { customerCountry },
    ],
  }).select({
    orderId: 1,
    ProductQuantity: 1,
    totalAmount: 1,
    productId: 1,
    customerId: 1,
    trackingId: 1,
    _id: 0,
  });

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Orders fetched successfuly.",
  });
};

exports.getOrdersByYear = async (request, response) => {
  const orderYear = request.params.date;
  const customerId = request.userId;

  const result = await OrderModel.find({ orderYear, customerId }).select({
    _id: 0,
    orderYear: 0,
    createdOn: 0,
  });

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Orders fetched successfuly.",
  });
};

