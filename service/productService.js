module.exports.user =async (request, response) => {
  response.send("user");
};

module.exports.admin = (request, response) => {
  response.send("admin");
};

module.exports.developer = (request, response) => {
  response.send("developer");
};
