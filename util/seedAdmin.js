const User = require("../model/Users");

const checkUser = async function () {
  const adminExists = await User.find({});
  if (!adminExists.length) {
    const new_data = {
      username: "Admin",
      department: "None",
      firstName: "Admin",
      lastName: "Admin",
      email: "zebenenaol@gmail.com",
      role: "Admin",
      password: "1234",
    };
    const admin = new User(new_data);
    await admin.save();
  }
};

module.exports = checkUser;
