const Task = require("../model/Tasks");
const mongoose = require("mongoose");
const Investor = require("../model/Investor");
const User = require("../model/Users");
const wrapAsync = require("../util/wrapAsync");
const Departments = require("../model/Departments");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "department";
const INVESTOR_SECRET = "investor";
const underscore = require("underscore");

module.exports.CreateTask = async function (req, res) {
  const data = req.body;
  if (
    !(
      data.companyName &&
      data.description &&
      data.priority &&
      data.taskType &&
      data.location &&
      data.contact_person_phone &&
      data.contact_person_name &&
      data.requested_date
    )
  ) {
    return res
      .json({
        msg: "All input is Required",
      })
      .status(401);
  }

  const dep = await Departments.findOne({ title: data.department });
  if (!dep) {
    return res
      .json({
        msg: "No such department",
      })
      .status(401);
  }
  const ticket_number = Date.now();
  let datas = {
    companyName: data.companyName,
    description: data.description,
    priority: data.priority,
    taskType: data.taskType,
    location: data.location,
    contact_person_phone: data.contact_person_phone,
    contact_person_name: data.contact_person_name,
    requested_date: data.requested_date,
    ticketNumber: ticket_number,
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
  task.assignedTo = user_data._id;
  task.isAssigned = "accepted";
  task.isEscalated = false;
  task.escalated_reason = "";
  await task.save();
  return res
    .json({
      msg: `Assigned a task to ${user_data.username}`,
    })
    .status(200);
});

module.exports.DeclineTask = async function (req, res) {
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
};

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

module.exports.DepartmentEscalatedTasks = async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const id = decodedToken.id;
  const escalatedTasks = await Task.find({
    department: id,
    isEscalated: true,
  }).populate("assignedTo");

  console.log(escalatedTasks);

  return res
    .json({
      msg: escalatedTasks,
    })
    .status(200);
};

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

module.exports.CancelRequestToInvestor = wrapAsync(async function (req, res) {
  const { taskId } = req.params;
  const data = req.body;
  const task = await Task.findById(taskId);
  if (!task) {
    return res
      .json({
        msg: "Task not found",
      })
      .status(200);
  }
  if (!data.reason) {
    return res.json({
      msg: "Reason is required",
    });
  }
  task.cancled_reason = data.reason;
  task.isAssigned = "decline";
  await task.save();
  return res.json({
    msg: "Task Declined Successfully",
  });
});

module.exports.CancledRequestsToInvestor = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INVESTOR_SECRET);
  const companyName = decodedToken.name;
  const canceledRequests = await Task.find({
    isAssigned: "decline",
    companyName: companyName,
  });
  console.log(canceledRequests);
  return res
    .json({
      msg: canceledRequests,
    })
    .status(200);
});

module.exports.SetPriority = wrapAsync(async function (req, res) {
  const data = req.body.priority;
  console.log(req.body);
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return res
      .json({
        msg: "No such task found",
      })
      .status(200);
  }
  if (data == 1 || data == 2 || data == 3) {
    task.priority = data;
    await task.save();
    return res
      .json({
        msg: "Prioity Set",
      })
      .status(200);
  }
  return res
    .json({
      msg: "No such priority",
    })
    .status(401);
});

module.exports.getYearlyData = wrapAsync(async function (req, res) {
  const task = await Task.find();
  const data = underscore.groupBy(task, "requested_date");
  const keys = Object.keys(data);
  let payload = {};
  keys.forEach((d) => {
    year = d.split("-")[0];
    month = d.split("-")[1];
    curr = String(new Date().getFullYear());
    if (year == curr) {
      payload[month] = data[d];
    }
  });

  return res
    .json({
      msg: payload,
    })
    .status(200);
});

module.exports.GetRating = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const data = req.body.rating;
  console.log(data);
  if (!data) {
    return res
      .json({
        msg: "Rating is Required",
      })
      .status(401);
  }
  const employee = await User.findById(id);
  if (!employee) {
    return res
      .json({
        msg: "No such employee",
      })
      .status(401);
  }
  employee.rating = (employee.rating + data) / 2;
  await employee.save();
  return res
    .json({
      msg: "Rated Sucessfully",
    })
    .status(200);
});

module.exports.getDepartmentYearlyData = async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const departmentName = decodedToken.id;
  const task = await Task.find({ department: departmentName });
  const data = underscore.groupBy(task, "requested_date");
  const keys = Object.keys(data);
  let payload = {};
  keys.forEach((d) => {
    year = d.split("-")[0];
    month = d.split("-")[1];
    curr = String(new Date().getFullYear());
    if (year == curr) {
      payload[month] = data[d];
    }
  });

  return res
    .json({
      msg: payload,
    })
    .status(200);
};

module.exports.getInvestorYearlyData = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INVESTOR_SECRET);
  const companyName = decodedToken.name;
  const task = await Task.find({ companyName: companyName });
  const data = underscore.groupBy(task, "requested_date");
  const keys = Object.keys(data);
  let payload = {};
  keys.forEach((d) => {
    year = d.split("-")[0];
    month = d.split("-")[1];
    curr = String(new Date().getFullYear());
    if (year == curr) {
      payload[month] = data[d];
    }
  });

  return res
    .json({
      msg: payload,
    })
    .status(200);
});
