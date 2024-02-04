const UserModel = require("../models/userModel");
const { userValidation } = require("../components/validation");
const _ = require("lodash");
const bcrypt = require("bcrypt");


/* Registeration */
module.exports.registerUser = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const { userName, email, number, password } = request.body;

  const userDataValid = userValidation({ userName, email, number, password });

  if (userDataValid)
    return response.status(400).send({
      request: "failed",
      userDataValid,
    });

  let result = await UserModel.find({ $or: [{ email }, { number }] });
  if (result.length !== 0)
    return response.status(400).send({
      request: "failed",
      message: "Email or Number already exist.",
    });

  result = new UserModel({
    userName: userName,
    email: email,
    number: number,
    password: password,
  });

  /* 
    
   -- Default schema Validation created in the model file.

  const schemaValidtion = result.validateSync();
  if (schemaValidtion) {
    return response.status(400).send(schemaValidtion);
  }
    */
  const salt = await bcrypt.genSalt(10);
  result.password = await bcrypt.hash(result.password, salt);

  const userCount = await UserModel.find().count();

  result.userId = result.createUserId(userCount);

  await result.save();

  response.status(201).send({
    request:"successfull",
    payload: "Inserted",
    message: "Payload inserted successfully."
  });
};


/* Login using email or number combined with password. */
module.exports.userLogin = async (request, response) => {
  if (_.isEmpty(request.body))
    return response.status(400).send({
      request: "failed",
      message: "request is missing an important feilds.",
    });

  const { email, number, password } = request.body;

  const userDataValid = userValidation({ email, number, password }, true);

  if (userDataValid)
    return response.status(400).send({
      request: "failed",
      userDataValid,
    });

  const user = await UserModel.findOne({
    $or: [{ email }, { number }],
  }).select({ userName: 1, email: 1, number: 1, password: 1 , userId:1, _id:0, role:1});
  if (!user)
    return response.status(500).send({
      request: "failed",
      payload: request.body,
      message: "User not found",
      error: "email or number might be worng.",
    });

  const validPassword = await bcrypt.compare(request.body.password, user.password);
  if (!validPassword)
    return response.status(400).send({
      request: "failed",
      payload: request.body,
      message: "User not found",
      error: "password might be worng.",
    });

  const result = {
    userName: user.userName,
    email: user.email,
    number: user.number,
  };

  const jwt_token = user.generateToken();

  response.cookie('jwt_token', jwt_token, {
    path:"/",
    maxAge: 900000, // 15 minutes
    httpOnly: true, // Helps mitigate XSS attacks
    secure: true, // Ensures the cookie is only sent over HTTPS
    sameSite: 'Strict', // Prevents cross-site request forgery (CSRF) attacks
    signed:true
  })

  response.send({
    request:"successfull",
    response: result,
    message: "User found"
  });
};