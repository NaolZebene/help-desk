const User = require("../model/Users");
const bcrypt = require("bcrypt")
const SALT = 12

const checkUser = async function () {
  const adminExists = await User.find({});
  if (!adminExists.length) {
    const password = await bcrypt.hash("1234",SALT)
    const new_data = {
      username: "Admin",
      department: "None",
      firstName: "Admin",
      lastName: "Admin",
      email: "zebenenaol@gmail.com",
      role: "Admin",
      password: password,
    };
    const admin = new User(new_data);
    await admin.save();
  }
};

module.exports = checkUser;
