const mongoose = require('mongoose');
const Investor = require('../model/Investor')
const Department = require('../model/Departments')
const jwt = require('jsonwebtoken')
const Task = require('../model/Tasks')
const User = require("../model/Users");
const bcrypt = require('bcrypt');
const SALT = 12
const SECRET_KEY = "department"

const wrapAsync = require('../util/wrapAsync')


module.exports.CreateUser = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const data = req.body;
    if (!(data.firstName && data.lastName && data.password && data.role && data.email && data.username && data.password)) {
        return res.json({
            msg: "All inputs are required"
        })
    }

    const hashedpassword = await bcrypt.hash(data.password, SALT);
    let datas = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        department: decodedToken.name,
        password: hashedpassword,
        role: data.role
    }

    const new_user = new User(datas);

    await new_user.save();
    return res.json({
        msg: "User created successfully"
    }).status(200)
})

module.exports.EditUser = wrapAsync(async function (req, res) {
    const data = req.body;
    const { userId } = req.params
    if (data.username && data.firstname && data.lastname) {
        return res.json({
            msg: "All inputs are required"
        }).status(403)
    }

    let datas = {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname
    }

    const data_exists = await User.findOneAndUpdate(userId, datas, { runValidators: true });

    if (!data_exists) {
        return res.json({
            msg: "No Such User"
        }).status(403)
    }

    return res.json({
        msg: "User Information updated successfully"
    }).status(200)

})

module.exports.DeleteUser = wrapAsync(async function (req, res) {
    const { userId } = req.params;
    const data_exists = await User.findById(userId);
    if (!data_exists) {
        return res.json({
            msg: "No Such User"
        }).status(403)
    }

    data_exists.isDeleted = true;
    await data_exists.save();

    return res.json({
        msg: "User Deleted Successfully"
    }).status(200)
})

module.exports.getAllUsers = wrapAsync(async function (req, res) {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const users = await User.find({ isDeleted: false, department: decodedToken.name });

    let data = []
    users.forEach((user) => {
        let datas = {
            _id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastname: user.lastName,
            role: user.role,
            email: user.email
        }
        data.push(datas)
    })
    return res.json({
        msg: data
    }).status(200)
})


module.exports.CreateInvestorAccount = (async function (req, res) {
    const data = req.body;

    const hashedpassword = await bcrypt.hash(data.password, SALT);
    let datas = {
        companyName: data.companyName,
        location: data.location,
        contact_phone: data.contact_phone,
        contact_person: data.contact_person,
        email: data.email,
        password: hashedpassword,
    }

    const new_investor = new Investor(datas);

    await new_investor.save();
    return res.json({
        msg: "Investor Account created successfully"
    }).status(200)
})


module.exports.EditInvestorAccount = wrapAsync(async function (req, res) {
    const data = req.body;
    const { investorId } = req.params
    if (!(data.companyName && data.password && data.location && data.email)) {
        return res.json({
            msg: "All inputs are required"
        })
    }

    let datas = {
        companyName: data.companyName,
        location: data.location,
        contact_phone: data.contact_phone,
        contact_person: data.contact_person,
        email: data.email,
    }

    const data_exists = await Investor.findOneAndUpdate(investorId, datas, { runValidators: true });

    if (!data_exists) {
        return res.json({
            msg: "No Such Investor"
        }).status(403)
    }

    return res.json({
        msg: "Investor Account Information updated successfully"
    }).status(200)
})

module.exports.DeleteInvestor = wrapAsync(async function (req, res) {
    const { investorId } = req.params;
    const data_exists = await Investor.findById(investorId);
    if (!data_exists) {
        return res.json({
            msg: "No Such Investor"
        }).status(403)
    }

    data_exists.isDeleted = true;
    await data_exists.save();

    return res.json({
        msg: "Investor Account Deleted Successfully"
    }).status(200)
})


module.exports.getAllInvestors = wrapAsync(async function (req, res) {
    const users = await Investor.find({ isDeleted: false });
    let data = []
    users.forEach((user) => {
        let datas = {
            _id: user.id,
            companyName: user.companyName,
            location: user.location,
            email: user.email,
            contact_phone: user.contact_phone,
            contact_person: user.contact_person
        }
        data.push(datas)
    })
    return res.json({
        msg: data
    }).status(200)
})

module.exports.CreateDepartment = wrapAsync(async function (req, res) {
    const data = req.body;

    if (!data.title && !data.password) {
        res.json({
            msg: "Department data is required"
        }).status(403)
    }

    const hashedpassword = await bcrypt.hash(data.password, SALT);
    const datas = {
        title: data.title,
        password: hashedpassword,
    }

    const newDepartment = new Department(datas);
    await newDepartment.save();

    return res.json({
        msg: "Created A department Successfully"
    }).status(200);

})

module.exports.EditDepartment = wrapAsync(async function () {
    const data = req.body;
    const { depId } = req.params

    if (!data.title) {
        res.json({
            msg: "Department data is required"
        }).status(403)
    }

    const datas = {
        title: data.title
    }

    const data_exists = await Department.findOneAndUpdate(depId, datas, { runValidators: true });

    if (!data_exists) {
        return res.json({
            msg: "No Such Department"
        }).status(403)
    }

    return res.json({
        msg: "Department Updated Successfully"
    }).status(200)

})

module.exports.DeleteDepartment = wrapAsync(async function (req, res) {
    const { depId } = req.params;
    const data = await Department.findById(depId);

    if (!data) {
        return res.json({
            msg: "No Such Department"
        }).status(403)
    }

    data.isDeleted = true;
    await data.save();

    return res.json({
        msg: "Department Deleted Successfully"
    }).status(200)
})

module.exports.GetDepartments = wrapAsync(async function (req, res) {
    const data = await Department.find({ isDeleted: false });
    let sentdata = []

    data.forEach((dep) => {
        let department = {
            title: dep.title,
            services: dep.services
        }
        sentdata.push(department)
    })
    res.json({
        msg: sentdata
    }).status(200)
})


module.exports.AdminDeclinedTasks = wrapAsync(async function (req, res) {
    const declinedTasks = await Task.find({ isAssigned: "canceled" }).populate("department")
    return res.json({
        msg: declinedTasks
    }).status(200)

})

module.exports.AssignToDepartment = wrapAsync(async function (re, res) {
    const id = req.body.depId
    const { taskId } = req.params;
    const department = await Department.findById(id)
    if (!department) {
        return res.json({
            msg: "No such department"
        })
    }

    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return res.json("NO such task")
    }

    task.department = department
    await task.save();

    return res.json({
        msg: "Task Assigned Successfully"
    })

})
