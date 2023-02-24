const Department = require("../model/Departments");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "department";
const bcrypt = require("bcrypt");
const wrapAsync = require("../util/wrapAsync");
const sendEmail = require("../util/sendEmail");
const Token = require("../model/Token");
const SALT = 12;

module.exports.Login = wrapAsync(async (req, res) => {
  const data = req.body;
  if (!data.title && data.password) {
    return res.json({
      msg: "Please Enter Your Department or password",
    });
  }

  const user = await Department.findOne({ title: data.title });
  console.log(user);
  if (!user) {
    return res.json({
      msg: "Incorrect Department Name or password",
    });
  }

  const correctPassword = await bcrypt.compare(data.password, user.password);
  if (!correctPassword) {
    return res
      .json({
        msg: "Incorrect Department name or Password",
      })
      .status(401);
  }
  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.title, depType: user.depType },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
  req.session.token = token;
  req.session.user = user;

  return res
    .json({
      msg: "Logged In Successfully",
      token: token,
    })
    .status(200);
});

module.exports.VerifyDepartmentToken = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const validToken = jwt.verify(token, SECRET_KEY);
  if (validToken) {
    return res
      .json({
        msg: true,
        payload: {
          role: validToken.role,
          name: validToken.name,
          depType: validToken.depType,
        },
      })
      .status(401);
  }
  return res
    .json({
      msg: false,
    })
    .status(200);
});

module.exports.resetPassword = async function (req, res) {
  const email = req.body.email;
  const user = await Department.findOne({ email: email });
  if (!user) {
    return res
      .json({
        msg: "user with the given email dont exist",
      })
      .status(200);
  }
  let token = await Token.findOne({ userId: user._id });
  if (!token) {
    let data = {
      userId: user._id,
      token: jwt.sign({ id: user._id }, SECRET_KEY),
    };
    token = new Token(data);
    await token.save();
  }
  const link = `http://localhost:3000/auth/department/passwordreset/${user._id}/${token.token}`;
  await sendEmail(
    user.email,
    "ICTHD PASSWORD RESET",
    `your password reset link is here :  ${link}`
  );
  return res
    .json({
      msg: "Reset Password link is sent Via Email Successfully",
    })
    .status(200);
};
module.exports.changeForgetPassword = async function (req, res) {
  const { token, userId } = req.params;
  const user = await Department.findById(userId);
  if (!user) {
    return res
      .json({
        msg: "Invalid Link orExpired Link",
      })
      .status(200);
  }
  const check_token = await Token.findOne({ token: token });
  if (!check_token) {
    return res
      .json({
        msg: "Invalid or Expired Token",
      })
      .status(401);
  }

  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if (password != confirm_password) {
    return res
      .json({
        msg: "Passwords Must Match",
      })
      .status(401);
  }

  const hashedpassword = await bcrypt.hash(password, SALT);
  user.password = hashedpassword;
  await user.save();
  await check_token.delete();
  return res.json({
    msg: "Password Changed Successfully",
  });
};
