const Department = require("../model/Departments");
const Services = require("../model/Services");
const wrapAsync = require("../util/wrapAsync");
const mongoose = require("mongoose");

module.exports.CreateServices = wrapAsync(async function (req, res) {
  const data = JSON.parse(req.body.str)[0];
  const icon = req.file.filename;
  const department = await Department.findOne({ title: data.department });
  if (!department) {
    return res
      .json({
        msg: "There is no such department",
      })
      .status(401);
  }

  let new_data = {
    title: data.title,
    description: data.description,
    department: department,
    icon:icon
  };

  const new_service = new Services(new_data);

  department.services.push(mongoose.Types.ObjectId(new_service));
  await department.save();
  await new_service.save();
  return res
    .json({
      msg: "Service Added Successfully",
    })
    .status(200);
});

module.exports.EditServices = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const data = JSON.parse(req.body.str)[0];
  const icon = req.file.filename;

  const department = await Department.findOne({ title: data.department });
  if (!department) {
    return res
      .json({
        msg: "There is no such department",
      })
      .status(401);
  }

  let new_data = {
    title: data.title,
    description: data.description,
    department: department,
    icon:icon
  };

  const edited_service = await Services.findOneAndUpdate(id, { new_data });

  if (!edited_service) {
    return res
      .json({
        msg: "No such service",
      })
      .status(401);
  }

  return res
    .json({
      msg: "Service Updated Successfully",
    })
    .status(200);
});

module.exports.DeleteService = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const deleted_data = await Services.findById(id);

  if (!deleted_data) {
    return res.json({
      msg: "No Such Service",
    });
  }
  deleted_data.isDeleted = True;
  return res.json({
    msg: "Service Deleted Successfully",
  });
});

module.exports.getOneService = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const data = Services.findById(id);

  if (!data) {
    return res
      .json({
        msg: "Invalid Id",
      })
      .status(401);
  }

  return res
    .json({
      msg: data.populate({ path: "department" }),
    })
    .status(200);
});

module.exports.getAllServices = wrapAsync(async function (req, res) {
  const data = await Services.find();
  return res
    .json({
      msg: data,
    })
    .status(200);
});
