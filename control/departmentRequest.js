const Departments = require("../model/Departments");
const Task = require("../model/Tasks");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "sjskbjdnbhjnbhjcsnskhnjdb";

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
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const ticket_number = Date.now();
  let datas = {
    companyName: decodedToken.department,
    description: data.description,
    taskType: data.taskType,
    location: data.location,
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
