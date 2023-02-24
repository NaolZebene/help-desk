const fs = require("fs");
const path = require("path");

const Department = require("../model/Departments");
const Services = require("../model/Services");
const wrapAsync = require("../util/wrapAsync");
const mongoose = require("mongoose");

module.exports.CreateServices = wrapAsync(async function (req, res) {
  const data = req.body;

  if (!(data.title && data.description && data.department)) {
    return res.json({
      msg: "All input is required",
    });
  }

  if (!req.file) {
    return res.json({
      msg: "icon Required",
    });
  }

  const icon = req.file.path;

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
    icon: icon,
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

module.exports.EditServices = async function (req, res) {
  const data = req.body;
  const { id } = req.params;

  if (!(data.title && data.description && data.department)) {
    return res.json({
      msg: "All input is required",
    });
  }

  let icon = data.icon;

  const department = await Department.findOne({ title: data.department });
  if (!department) {
    return res
      .json({
        msg: "There is no such department",
      })
      .status(401);
  }

  if (req.file) {
    icon = req.file.path;
  }
  if (!icon) {
    return res.json({
      msg: "Icon Required",
    });
  }

  const edited_service = await Services.findById(id);

  if (!edited_service) {
    return res
      .json({
        msg: "No such service",
      })
      .status(401);
  }

  if (icon !== edited_service.icon) {
    clearImage(edited_service.icon);
  }

  let new_data = {
    title: data.title,
    description: data.description,
    department: department,
    icon: icon,
  };

  await Services.findByIdAndUpdate(id, new_data);

  return res
    .json({
      msg: "Service Updated Successfully",
    })
    .status(200);
};

module.exports.DeleteService = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const deleted_data = await Services.findById(id);

  if (!deleted_data) {
    return res.json({
      msg: "No Such Service",
    });
  }
  deleted_data.isDeleted = true;
  await deleted_data.save();
  return res.json({
    msg: "Service Deleted Successfully",
  });
});

module.exports.getOneService = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const data = await Services.findById(id).populate({ path: "department" });

  if (!data) {
    return res
      .json({
        msg: "Invalid Id",
      })
      .status(401);
  }

  return res
    .json({
      msg: data,
    })
    .status(200);
});

module.exports.getAllServices = wrapAsync(async function (req, res) {
  const data = await Services.find({ isDeleted: false });
  return res
    .json({
      msg: data,
    })
    .status(200);
});

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
