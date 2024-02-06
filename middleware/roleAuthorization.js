module.exports.roleAdmin = function (request, response, callback) {
  if (request.role !== process.env.ROLE_TWO)
    return response.status(403).send({
      request: "failed admin",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  callback();
};

module.exports.roleDev = function (request, response, callback) {
  if (
    request.role !== process.env.ROLE_THREE ||
    request.role !== process.env.ROLE_TWO
  )
    return response.status(403).send({
      request: "failed dev",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  callback();
};

module.exports.roleUser = function (request, response, callback) {
  console.log(request.role);
  if (
    request.role !== process.env.ROLE_ONE ||
    request.role !== process.env.ROLE_TWO ||
    request.role !== process.env.ROLE_THREE
  )
    return response.status(403).send({
      request: "failed user ",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
  callback();
};