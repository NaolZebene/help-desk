const mongoose = require('mongoose');
const User = require("../model/Users");
const bcrypt = require('bcrypt');
const SALT = 12


module.exports.CreateUser = async function (req, res) {
    const data = req.body;
    console.log(req.session)

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
        password: hashedpassword,
        role: data.role
    }

    const new_user = new User(datas);

    await new_user.save();
    return res.json({
        msg: "User created successfully"
    }).status(200)
}

module.exports.EditUser = async function (req, res) {
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

    const data_exists = await User.findOneAndUpdate(id, datas, { runValidators: true });

    if (!data_exists) {
        return res.json({
            msg: "No Such User"
        }).status(403)
    }

    return res.json({
        msg: "User Information updated successfully"
    }).status(200)

}

module.exports.DeleteUser = async function (req, res) {
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
}

module.exports.getAllUsers = async function (req, res) {
    const users = await User.find({ isDeleted: false });
    return res.json({
        msg: users
    }).status(200)
}