const User = require("../models/User");
const UserController = require("./UserController");

module.exports = UserController(User);