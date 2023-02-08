const Investor = require("../model/Investor");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "investor";
const bcrypt = require("bcrypt");
const wrapAsync = require("../util/wrapAsync");

module.exports.Login = wrapAsync(async (req, res) => {
  const data = req.body;
  if (!data.companyName && data.password) {
    return res.json({
      msg: "Please Enter Your companyname or password",
    });
  }

  const user = await Investor.findOne({ companyName: data.companyName });
  console.log(user);
  if (!user) {
    return res.json({
      msg: "Incorrect username or password",
    });
  }

  const correctPassword = await bcrypt.compare(data.password, user.password);
  if (!correctPassword) {
    return res
      .json({
        msg: "Incorrect company name or Password",
      })
      .status(401);
  }
  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.companyName },
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

module.exports.VerifyInvestorToken = wrapAsync(async function (req, res) {
  const token = req.body.token.split(" ")[1];
  const validToken = jwt.verify(token, SECRET_KEY);
  if (!validToken) {
    return res
      .json({
        msg: true,
        payload: {
          role: validToken.role,
          name: validToken.name,
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
