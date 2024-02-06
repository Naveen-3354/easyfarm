const CategoryModel = require("../models/categoryModel");
const _ = require("lodash");

exports.getAllCategory = async (request, response) => {
  const result = await CategoryModel.find().select({
    categoryName: 1,
    image: 1,
    categoryId: 1,
    _id: 0,
  });

  response.status(200).send({
    request: "Sccessfull",
    result,
    message: "Data fetched.",
  });
};

exports.addCategory = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const { categoryName, image, createdBy } = request.body;

  let result = await CategoryModel.find({ categoryName }).select({
    categoryName: 1,
    _id: 0,
  });

  if (result.length != 0)
    return response.status(400).send({
      request: "failed",
      message: "Category already exist.",
    });

  result = CategoryModel({
    categoryName,
    image,
    createdBy,
  });
  const count = await CategoryModel.find().count();
  result.categoryId = result.createCategoryId(count);

  await result.save();

  response.status(201).send({
    request: "successfull",
    payload: "Inserted",
    message: "Category inserted successfully.",
  });
};

exports.deleteCategory = async (request, response) => {
  if (!request.params.id)
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const result = await CategoryModel.findOne({
    categoryId: request.params.id,
  }).select({ status: 1, _id: 0 });
  result.status = "Inactive";

  await result.save();

  response.status(201).send({
    request: "successfull",
    message: "Category deleted successfully.",
  });
};

exports.updateCategory = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const { categoryName, categoryId } = request.body;
  const result = await CategoryModel.findOne({
    categoryId,
  }).select({ categoryName: 1, _id: 0 });

  result.categoryName = categoryName;

  await result.save();

  response.status(201).send({
    request: "successfull",
    message: "Category updated successfully.",
  });
};
