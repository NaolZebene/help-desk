const Investor = require("../model/Investor");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "investor";
const bcrypt = require("bcrypt");
const wrapAsync = require("../util/wrapAsync");
const Token = require("../model/Token")
const SALT = 12

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
  const token = req.get("Authorization").split(" ")[1];
  const validToken = jwt.verify(token, SECRET_KEY);
  if (validToken) {
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

module.exports.resetPassword = async function (req, res) {
  const email = req.body.email;
  const user = await Investor.findOne({ email: email });
  if (!user) {
    return res
      .json({
        msg: "investor with the given email dont exist",
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
  const link = `http://localhost:3000/auth/investor/passwordreset/${user._id}/${token.token}`;
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
  const user = await Investor.findById(userId);
  if (!user) {
    return res
      .json({
        msg: "Invalid Link or Expire  Link",
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

module.exports.ChangePassword = wrapAsync(async function(req,res){
  const token = req.get("Authorization").split(" ")[1];
  const validToken = jwt.verify(token, SECRET_KEY);
  const {oldpassword, confirmoldpassword, new_password} = req.body;
  if (oldpassword != confirmoldpassword){
    return res.json({
      msg:"Password Must Match"
    }).status(200)
  }
  const user = await Investor.findById(validToken.id);
  if(!user){
    return res.json({
      msg:"No such user "
    }).status(401)
  }
  const correctold = await bcrypt.compare(oldpassword,user.password)
  if(!correctold){
    return res.json({
      msg:"Incorrect old password"
    }).status(200)
  }
  const new_pass = await bcrypt.hash(new_password, SALT);
  user.password = new_pass;
  await user.save();
  return res.json({
    msg:"Password Changed Successfully"
  })
})

