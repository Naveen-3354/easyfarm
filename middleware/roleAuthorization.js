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
    request.role === process.env.ROLE_THREE ||
    request.role === process.env.ROLE_TWO
  )
    callback();
  else
    return response.status(403).send({
      request: "failed dev",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
};

module.exports.roleUser = function (request, response, callback) {
  if (
    request.role === process.env.ROLE_ONE ||
    request.role === process.env.ROLE_TWO ||
    request.role === process.env.ROLE_THREE
  )
    callback();
  else
    return response.status(403).send({
      request: "failed user ",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
};

module.exports.roleSeller = function (request, response, callback) {
  if (
    request.role === process.env.ROLE_FOUR ||
    request.role === process.env.ROLE_TWO ||
    request.role === process.env.ROLE_THREE
  )
    callback();
  else
    return response.status(403).send({
      request: "failed user ",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
};

module.exports.roleMember = function (request, response, callback) {
  if (
    request.role === process.env.ROLE_FIVE ||
    request.role === process.env.ROLE_TWO ||
    request.role === process.env.ROLE_THREE
  )
    callback();
  else
    return response.status(403).send({
      request: "failed user ",
      message: "User not found.",
      error: "Access denied.",
      redirect: "/auth/login",
    });
};