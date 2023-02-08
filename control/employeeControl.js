const Task = require("../model/Tasks");
const mongoose = require("mongoose");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const wrapAsync = require("../util/wrapAsync");
const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb";
const DEP_KEY = "department";
const INV_KEY = "investor";

module.exports.EscalateTask = async function (req, res) {
  const { taskId } = req.params;
  const data = req.body;
  const task = await Task.findById(taskId);
  if (!task) {
    return res
      .json({
        msg: "No such task",
      })
      .status(403);
  }

  task.assignedTo = [];
  task.isEscalated = true;
  task.escalated_reason = data.reason || "";

  await task.save();

  return res
    .json({
      msg: "Escalated Task Successfully",
    })
    .status(200);
};

module.exports.ViewProfile = async (req, res) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken = jwt.verify(token, SECRET_KEY);

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res
      .json({
        msg: "User not found",
      })
      .status(403);
  }
  return res
    .json({
      msg: user,
    })
    .status(200);
};

module.exports.ViewTasks = async (req, res) => {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const tasks = await Task.find({ assignedTo: { $in: decodedToken.id } });
  return res
    .json({
      msg: tasks,
    })
    .status(200);
};

module.exports.DepartmentEmployees = wrapAsync(async function (req, res) {
  const { empId } = req.params;
  const users = await User.findById(empId);
  if (!users) {
    return res
      .json({
        msg: "No Such Id",
      })
      .status(401);
  }

  return res
    .json({
      msg: users,
    })
    .status(200);
});
