const ProductModel = require("../models/productsModel");
const _ = require("lodash");

exports.getAllproducts = async (request, response) => {
  const result = await ProductModel.find().select({
    productName: 1,
    productId: 1,
    categoryName: 1,
    quantity: 1,
    status: 1,
    description: 1,
    _id: 0,
  });

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Products fetched successfuly.",
  });
};

exports.getActiveProducts = async (request, response) => {
  const status = request.params.status;
  const result = await ProductModel.find({ status }).select({
    productName: 1,
    productId: 1,
    categoryName: 1,
    quantity: 1,
    status: 1,
    description: 1,
    _id: 0,
  });

  response.status(200).send({
    request: "Successfull",
    result,
    message: "Products fetched successfuly.",
  });
};

exports.createNewProduct = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const { productName, description, categoryName, quantity, productImg } =
    request.body;

  const result = ProductModel({
    productName,
    description,
    categoryName,
    quantity,
    productImg,
  });
  const count = await ProductModel.find().count();
  result.productId = result.gecreateProductId(count);
  result.sellerId = request.userId;

  await result.save();
  response.status(201).send({
    request: "Successfull",
    message: "Product inserted successfully.",
  });
};

exports.updateProduct = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });
  const { productName, description, categoryName, quantity, productImg } =
    request.body;

  const productId = request.params.id;

  const result = await ProductModel.find({ productId }).select({
    productName,
    description,
    categoryName,
    quantity,
    productImg,
  });

  await result.save();

  response.status(201).send({
    required: "Successfull",
    message: "Product updated successfully.",
  });
};

exports.deleteProducts = async (request, response) =>{
  const productId  = request.params.id;
  const result = await ProductModel.findOne({productId}).select({status:1,_id:0})
  result.status = "Inactive";
  await result.save();
  response.status(200).send({
    required: "Successfull",
    message: "Product deleted successfully.",
  })
}
