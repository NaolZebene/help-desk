const Task = require("../model/Tasks");
const mongoose = require("mongoose");
const Investor = require("../model/Investor");
const User = require("../model/Users");
const wrapAsync = require("../util/wrapAsync");
const Departments = require("../model/Departments");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "department";
const INVESTOR_SECRET = "investor";

module.exports.CreateTask = async function (req, res) {
  const data = req.body;
  const dep = await Departments.findOne({ title: data.department });

  if (!dep) {
    return res
      .json({
        msg: "No such department",
      })
      .status(401);
  }
  let datas = {
    companyName: data.companyName,
    description: data.description,
    priority: data.priority,
    taskType: data.taskType,
    location: data.location,
    contact_person_phone: data.contact_person_phone,
    contact_person_name: data.contact_person_name,
    requested_date: data.requested_date,
  };
  const task = new Task(datas);
  task.department = dep;
  await task.save();
  return res
    .json({
      msg: "Task submitted Successfully",
    })
    .status(200);
};

module.exports.GetTask = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const id = decodedToken.id;

  const tasks = await Task.find({ department: id, isAssigned: "pending" });
  return res
    .json({
      msg: tasks,
    })
    .status(200);
});

module.exports.UpdateTask = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const updated_data = {
    companyName: data.companyName,
    description: data.description,
    priority: data.priority,
    taskType: data.taskType,
    location: data.location,
    contact_person_phone: data.contact_person_phone,
    contact_person_name: data.contact_person_name,
  };
  const data_exists = await Task.findOneAndUpdate(id, updated_data, {
    runValidators: true,
  });
  if (data_exists) {
    res
      .json({
        msg: "Updated Successfully",
      })
      .status(200);
  }

  return res
    .json({
      msg: "Such data dont exist",
    })
    .status(403);
});

module.exports.AssignTask = wrapAsync(async function (req, res) {
  const { userId, taskId } = req.params;
  const user_data = await User.findById(userId);
  const data = req.body;
  if (!user_data) {
    return res
      .json({
        msg: "No Such User",
      })
      .status(403);
  }
  const task = await Task.findById(taskId);
  if (!task) {
    return res
      .json({
        msg: "No such task",
      })
      .status(403);
  }
  task.assignedTo = [];
  task.assignedTo.push(user_data);
  task.isAssigned = "accepted";
  task.isEscalated = false;
  task.priority = data.priority;
  task.escalated_reason = "";
  await task.save();
  return res
    .json({
      msg: `Assigned a task to ${user_data.username}`,
    })
    .status(200);
});

module.exports.DeclineTask = wrapAsync(async function (req, res) {
  const { taskId } = req.params;
  const data = req.body;
  if (!data.reason) {
    return res
      .json({
        msg: "Please enter the reason",
      })
      .status(403);
  }
  const task = await Task.findById(mongoose.Types.ObjectId(taskId));
  if (!task) {
    return res
      .json({
        msg: "No such task",
      })
      .status(403);
  }
  task.isAssigned = "canceled";
  task.isEscalated = false;
  task.reason = String(data.reason);
  task.escalated_reason = "";
  await task.save();
  return res.json({
    msg: "Task declined Successfully",
  });
});

module.exports.getOneTask = wrapAsync(async function (req, res) {
  const { taskId } = req.params;
  const one_task = await Task.findById(taskId);
  if (!one_task) {
    return res
      .json({
        msg: "Id dont exist",
      })
      .status(403);
  }
  return res
    .json({
      msg: one_task,
    })
    .status(200);
});

module.exports.DepartmentEscalatedTasks = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const id = decodedToken.id;
  const escalatedTasks = await Task.find({ department: id, isEscalated: true });

  return res
    .json({
      msg: escalatedTasks,
    })
    .status(200);
});

module.exports.ViewSentTask = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INVESTOR_SECRET);
  const companyName = decodedToken.name;

  const company = await Task.find({
    companyName: companyName,
    isAssigned: ["pending", "accepted", "canceled"],
  });

  return res
    .json({
      msg: company,
    })
    .status(200);
});

module.exports.CompleteTask = wrapAsync(async function (req, res) {
  const { taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return res
      .json({
        msg: "No such task",
      })
      .status(401);
  }
  task.isAssigned = "completed";
  await task.save();

  return res
    .json({
      msg: "Successfull",
    })
    .status(200);
});

module.exports.AllHistory = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const departmentName = decodedToken.id;

  const datas = await Task.find({ department: departmentName });
  return res
    .json({
      msg: datas,
    })
    .status(200);
});

module.exports.ViewCompletedTasks = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INVESTOR_SECRET);
  const companyName = decodedToken.name;

  const company = await Task.find({
    companyName: companyName,
    isAssigned: "completed",
  });

  return res
    .json({
      msg: company,
    })
    .status(200);
});
