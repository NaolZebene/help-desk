const Department = require("../model/Departments");
const User = require("../model/Users");
const Investor = require("../model/Investor");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb";
const SECRET_KEY_Investor = "investor";
const SECRET_KEY_Department = "department";

module.exports.isDepartment = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY_Department);
    if (decodedToken.role != "Department") {
      return res
        .json({
          msg: "You are Unauthorized to view this content",
        })
        .status(403);
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports.isInvestor = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY_Investor);
    if (decodedToken.role != "Investor") {
      return res
        .json({
          msg: "You are Unauthorized to view this content",
        })
        .status(403);
    }
  } catch (err) {
    console.log(err);
  }
  next();
};
module.exports.isEmployee = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
    if (decodedToken.role != "Employee") {
      return res
        .json({
          msg: "You are Unauthorized to view this content",
        })
        .status(403);
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
    if (decodedToken.role != "Admin") {
      return res
        .json({
          msg: "You are Unauthorized to view this content",
        })
        .status(403);
    }
  } catch (err) {
    console.log(err);
  }
  next();
};
