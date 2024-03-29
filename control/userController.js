const mongoose = require("mongoose");
const Investor = require("../model/Investor");
const Department = require("../model/Departments");
const jwt = require("jsonwebtoken");
const Task = require("../model/Tasks");
const User = require("../model/Users");
const bcrypt = require("bcrypt");
const SALT = 12;
const SECRET_KEY = "department";
const USER_SEC = "sjskbjdnbhjnbhjcsnskhnjdb";
const INV_KEY = "investor"

const wrapAsync = require("../util/wrapAsync");

module.exports.CreateUser = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const data = req.body;
  if (
    !(
      data.firstName &&
      data.lastName &&
      data.password &&
      data.role &&
      data.email &&
      data.username &&
      data.password
    )
  ) {
    return res.json({
      msg: "All inputs are required",
    });
  }

  const hashedpassword = await bcrypt.hash(data.password, SALT);
  let datas = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    department: decodedToken.name,
    password: hashedpassword,
    role: data.role,
  };

  const new_user = new User(datas);

  await new_user.save();
  return res
    .json({
      msg: "User created successfully",
    })
    .status(200);
});

module.exports.EditUser = wrapAsync(async function (req, res) {
  const data = req.body;
  const { userId } = req.params;
  if (data.username && data.firstname && data.lastname) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(403);
  }

  let datas = {
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname,
  };

  const data_exists = await User.findOneAndUpdate(userId, datas, {
    runValidators: true,
  });

  if (!data_exists) {
    return res
      .json({
        msg: "No Such User",
      })
      .status(403);
  }

  return res
    .json({
      msg: "User Information updated successfully",
    })
    .status(200);
});

module.exports.DeleteUser = wrapAsync(async function (req, res) {
  const { userId } = req.params;
  const data_exists = await User.findById(userId);
  if (!data_exists) {
    return res
      .json({
        msg: "No Such User",
      })
      .status(403);
  }

  data_exists.isDeleted = true;
  await data_exists.save();

  return res
    .json({
      msg: "User Deleted Successfully",
    })
    .status(200);
});

module.exports.getAllUsers = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const users = await User.find({
    isDeleted: false,
    department: decodedToken.name,
  });

  let data = [];
  users.forEach((user) => {
    let datas = {
      _id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastname: user.lastName,
      role: user.role,
      email: user.email,
      rating: user.rating,
    };
    data.push(datas);
  });
  return res
    .json({
      msg: data,
    })
    .status(200);
});

module.exports.CreateInvestorAccount = async function (req, res) {
  const data = req.body;
  if (
    !(
      data.companyName &&
      data.location &&
      data.contact_phone &&
      data.contact_person &&
      data.email &&
      data.password
    )
  ) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(401);
  }
  const hashedpassword = await bcrypt.hash(data.password, SALT);
  let datas = {
    companyName: data.companyName,
    location: data.location,
    contact_phone: data.contact_phone,
    contact_person: data.contact_person,
    email: data.email,
    password: hashedpassword,
  };

  const new_investor = new Investor(datas);

  await new_investor.save();
  return res
    .json({
      msg: "Investor Account created successfully",
    })
    .status(200);
};

module.exports.EditInvestorAccount = wrapAsync(async function (req, res) {
  const data = req.body;
  const { investorId } = req.params;
  if (
    !(
      data.companyName &&
      data.location &&
      data.contact_phone &&
      data.contact_person &&
      data.email
    )
  ) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(401);
  }
  let datas = {
    companyName: data.companyName,
    location: data.location,
    contact_phone: data.contact_phone,
    contact_person: data.contact_person,
    email: data.email,
  };
  const data_exists = await Investor.findByIdAndUpdate(investorId, datas, {
    runValidators: true,
  });

  if (!data_exists) {
    return res
      .json({
        msg: "No Such Investor",
      })
      .status(403);
  }

  return res
    .json({
      msg: "Investor Account Information updated successfully",
    })
    .status(200);
});

module.exports.getOneInvestor = wrapAsync(async function (req, res) {
  const { invid } = req.params;
  const invDetail = await Investor.findById(invid);
  if (!invDetail) {
    return res
      .json({
        msg: "No such investor",
      })
      .status(401);
  }
  let data = {
    companyName: invDetail.companyName,
    location: invDetail.location,
    contact_person: invDetail.contact_person,
    contact_phone: invDetail.contact_phone,
    role: invDetail.role,
    email: invDetail.email,
  };
  return res
    .json({
      msg: data,
    })
    .status(200);
});

module.exports.DeleteInvestor = wrapAsync(async function (req, res) {
  const { investorId } = req.params;
  const data_exists = await Investor.findById(investorId);
  if (!data_exists) {
    return res
      .json({
        msg: "No Such Investor",
      })
      .status(403);
  }

  data_exists.isDeleted = true;
  await data_exists.save();

  return res
    .json({
      msg: "Investor Account Deleted Successfully",
    })
    .status(200);
});

module.exports.getAllInvestors = wrapAsync(async function (req, res) {
  const users = await Investor.find({ isDeleted: false });
  let data = [];
  users.forEach((user) => {
    let datas = {
      _id: user.id,
      companyName: user.companyName,
      location: user.location,
      email: user.email,
      contact_phone: user.contact_phone,
      contact_person: user.contact_person,
    };
    data.push(datas);
  });
  return res
    .json({
      msg: data,
    })
    .status(200);
});

module.exports.CreateDepartment = wrapAsync(async function (req, res) {
  const data = req.body;

  if (!(data.email && data.title && data.password)) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(403);
  }

  const hashedpassword = await bcrypt.hash(data.password, SALT);
  const datas = {
    title: data.title,
    password: hashedpassword,
    email: data.email,
  };

  const newDepartment = new Department(datas);
  await newDepartment.save();

  return res
    .json({
      msg: "Created A department Successfully",
    })
    .status(200);
});

module.exports.EditDepartment = wrapAsync(async function (req, res) {
  const data = req.body;
  const { depId } = req.params;

  if (!(data.email && data.title)) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(403);
  }

  const datas = {
    title: data.title,
    email: data.email,
  };

  const data_exists = await Department.findByIdAndUpdate(depId, datas, {
    runValidators: true,
  });

  if (!data_exists) {
    return res
      .json({
        msg: "No Such Department",
      })
      .status(403);
  }

  return res
    .json({
      msg: "Department Updated Successfully",
    })
    .status(200);
});

module.exports.DeleteDepartment = wrapAsync(async function (req, res) {
  const { depId } = req.params;
  const data = await Department.findById(depId);

  if (!data) {
    return res
      .json({
        msg: "No Such Department",
      })
      .status(403);
  }

  data.isDeleted = true;
  await data.save();

  return res
    .json({
      msg: "Department Deleted Successfully",
    })
    .status(200);
});

module.exports.GetDepartments = wrapAsync(async function (req, res) {
  const data = await Department.find({ isDeleted: false }).populate("services");
  let sentdata = [];

  data.forEach((dep) => {
    let department = {
      id: dep._id,
      title: dep.title,
      services: dep.services,
    };
    sentdata.push(department);
  });
  res
    .json({
      msg: sentdata,
    })
    .status(200);
});

module.exports.AdminDeclinedTasks = wrapAsync(async function (req, res) {
  const declinedTasks = await Task.find({ isAssigned: "canceled" }).populate(
    "department"
  );
  return res
    .json({
      msg: declinedTasks,
    })
    .status(200);
});

module.exports.AssignToDepartment = wrapAsync(async function (req, res) {
  //   const id = req.body.depId;
  const { taskId, depId } = req.params;
  const department = await Department.findById(depId);
  if (!department) {
    return res.json({
      msg: "No such department",
    });
  }

  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return res.json("No such task");
  }

  console.log(department);
  task.department = department;
  task.isAssigned = "pending";
  task.isEscalated = false;
  await task.save();

  return res.json({
    msg: "Task Assigned Successfully",
  });
});
module.exports.getOneDepartment = wrapAsync(async function (req, res) {
  const { depid } = req.params;
  const depDetail = await Department.findById(depid).populate("services");
  if (!depDetail) {
    return res
      .json({
        msg: "No Such Department",
      })
      .status(200);
  }

  let data = {
    title: depDetail.title,
    services: depDetail.services,
    role: depDetail.role,
    email: depDetail.email,
  };

  return res
    .json({
      msg: data,
    })
    .status(200);
});

module.exports.getDepartmentDashboardData = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const employees = await User.count({ department: decodedToken.name })
  const request = await Task.count({ department: decodedToken.id })
  const canceled = await Task.count({ isAssigned: "decline", department: decodedToken.id })
  const completed = await Task.count({ isAssigned: "completed", department: decodedToken.id })
  const data = {
    total_employees: employees,
    totalrequest: request,
    canceled: canceled,
    completed: completed
  }

  return res.json({
    msg: data
  }).status(200)
})

module.exports.getSuperAdminDashboardData = wrapAsync(async function (req, res) {
  const employees = await User.count({})
  const request = await Task.count({})
  const canceled = await Task.count({ isAssigned: "decline" })
  const completed = await Task.count({ isAssigned: "completed" })
  const data = {
    total_employees: employees,
    totalrequest: request,
    canceled: canceled,
    completed: completed
  }

  return res.json({
    msg: data
  }).status(200)
})

module.exports.getInvestorDashboardData = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, "investor");
  const request = await Task.count({ companyName: decodedToken.name })
  const completed = await Task.count({ isAssigned: "completed", companyName: decodedToken.name })

  const data = {
    totalrequest: request,
    completed: completed
  }

  return res.json({
    msg: data
  }).status(200)
})
////////////profile

module.exports.EditUserProfile = wrapAsync(async function (req, res) {
  const data = req.body;
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, USER_SEC);
  if (
    !(
      data.firstName &&
      data.lastName &&
      data.email &&
      data.username
    )
  ) {
    return res.json({
      msg: "All inputs are required",
    });
  }
  const new_data = {
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  }
  const user_data = await User.findByIdAndUpdate(decodedToken.id, new_data, {
    runValidators: true,
  });
  if (!user_data) {
    return res.json({
      msg: "No such user"
    }).status(401)
  }

  return res.json({
    msg: "Data Updated Successfully"
  }).status(200)
})

module.exports.EditDepartmentProfile = wrapAsync(async function (req, res) {
  const data = req.body;
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);

  if (!(data.email && data.title)) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(403);
  }

  const datas = {
    title: data.title,
    email: data.email,
  };

  const data_exists = await Department.findByIdAndUpdate(decodedToken.id, datas, {
    runValidators: true,
  });

  if (!data_exists) {
    return res
      .json({
        msg: "No Such Department",
      })
      .status(403);
  }

  return res
    .json({
      msg: "Department Updated Successfully",
    })
    .status(200);
});

module.exports.EditInvestorProfile = wrapAsync(async function (req, res) {
  const data = req.body;
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INV_KEY);
  if (
    !(
      data.companyName &&
      data.location &&
      data.contact_phone &&
      data.contact_person &&
      data.email
    )
  ) {
    return res
      .json({
        msg: "All inputs are required",
      })
      .status(401);
  }
  let datas = {
    companyName: data.companyName,
    location: data.location,
    contact_phone: data.contact_phone,
    contact_person: data.contact_person,
    email: data.email,
  };
  const data_exists = await Investor.findByIdAndUpdate(decodedToken.id, datas, {
    runValidators: true,
  });

  if (!data_exists) {
    return res
      .json({
        msg: "No Such Investor",
      })
      .status(403);
  }

  return res
    .json({
      msg: "Investor Account Information updated successfully",
    })
    .status(200);
});

module.exports.ViewUserProfile = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, USER_SEC);
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return res
      .json({
        msg: "No Such User",
      })
      .status(403);
  }
  const new_data = {
    username: user.username,
    department: user.department,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    rating: user.rating
  }
  return res.json({
    msg: new_data
  }).status(200)

})

module.exports.ViewDepartmentProfile = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, SECRET_KEY);
  const DepData = await Department.findById(decodedToken.id).populate('services')

  if (!DepData) {
    return res
      .json({
        msg: "No Such Department",
      })
      .status(403);
  }
  const new_data = {
    title: DepData.title,
    email: DepData.email,
    services: DepData.services,
    depType: DepData.depType
  }
  return res.json({
    msg: new_data
  }).status(200)

})

module.exports.ViewInvestorProfile = wrapAsync(async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INV_KEY);
  const invData = await Investor.findById(decodedToken.id);
  if (!invData) {
    return res.json({
      msg: "No such User"
    }).status(401)
  }
  const data = {
    companyName: invData.companyName,
    location: invData.location,
    contact_person: invData.contact_person,
    contact_phone: invData.contact_phone,
    email: invData.email
  }
  return res.json({
    msg: data
  }).status(200)
})

