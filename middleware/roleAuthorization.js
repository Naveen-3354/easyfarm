module.exports.userRole = function (request, response, callback) {
  if (request.role !== process.env.ROLE_ONE)
    return response.status(403).send({
      request: "failed 2",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  callback();
};

module.exports.adminRole = function (request, response, callback) {
  if (request.role !== process.env.ROLE_TWO)
    return response.status(403).send({
      request: "failed",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  callback();
};

module.exports.developRole = function (request, response, callback) {
  if (request.role !== process.env.ROLE_THREE)
    return response.status(403).send({
      request: "failed",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  callback();
};
