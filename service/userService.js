const { response } = require("express");
const UserModel = require("../models/userModel");
const _ = require("lodash");
const { number } = require("joi");

module.exports.getAllUser = async (request, response) => {
  const result = await UserModel.find().select({
    userName: 1,
    email: 1,
    number: 1,
    userId: 1,
    proffileImg: 1,
    status: 1,
    createdOn: 1,
    _id: 0,
    role: 1,
  });
  response.status(200).send({
    request: "successfull",
    result,
    message: "Data fetched successfully",
  });
};

module.exports.getByFields = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const { userName, email, number, status, role, userId, createdOn } = req.body;
  const error = registerValidationCustom({ userName, email, number }, true);
  if (error) return res.status(400).send(error);
  const result = await UserModel.find({
    $or: [
      { userName },
      { email },
      { number },
      { status },
      { role },
      { userId },
      { createdOn },
    ],
  }).select({
    userName: 1,
    email: 1,
    number: 1,
    userId: 1,
    proffileImg: 1,
    status: 1,
    createdOn: 1,
    _id: 0,
    role: 1,
  });
  res.status(200).send({
    request: "Successfull",
    result,
    message: "Data fetched successfully",
  });
};

module.exports.getById = async (request, response) => {
  const userId = request.userId;

  const result = await UserModel.findOne({ userId }).select({
    userName: 1,
    email: 1,
    number: 1,
    userId: 1,
    proffileImg: 1,
    status: 1,
    createdOn: 1,
    _id: 0,
    role: 1,
  });

  res.status(200).send({
    request: "Successfull",
    result,
    message: "Data fetched successfully",
  });
};

module.exports.updateUser = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const userId = request.userId;
  const error = registerValidationCustom({ userName, email, number }, true);
  if (error) return res.status(400).send(error);

  const result = await UserModel.findByIdAndUpdate({ userId }).select({
    userName: 1,
    email: 1,
    number: 1,
  });

  result.userName = userName;
  result.email = email;
  result.number = number;
  await result.save();

  response.status(200).send({
    message: "User details update successfully.",
  });
};

module.exports.deleteUser = async (request, response) => {
  const userId = request.userId;

  const result = await UserModel.findOne({userId})

  result.status = "Inactive";

  response.status(200).send({
    request:"successfull",
    message:"User has been deleted."
  })
};
