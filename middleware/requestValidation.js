const _ = require("lodash");
const jwt = require("jsonwebtoken");

module.exports = function (request, response, callback) {
  const cookie_data = request.signedCookies;

  if (_.isEmpty(cookie_data))
    return response.status(400).send({
      request: "failed",
      message: "Session expired or not found.",
      error: "Missing Cookie.",
      redirect: "/auth/login",
    });

  let token = cookie_data.jwt_token;

  if (!token)
    return response.status(400).send({
      request: "failed",
      message: "Session expired or not found.",
      error: "Missing Token.",
      redirect: "/auth/login",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.userId = decoded.userId;
  } catch (error) {
    return response.status(403).send({
      request: "failed",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  }

  callback();
};
