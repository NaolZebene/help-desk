const mongoose = require('mongoose');
const User = require("../model/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 12
const secret_key = "jksbdhvcnbxvscnmdDJSBJHDS"

module.exports.CreateUser = async function (req, res) {
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
        password: hashedpassword,
        role: data.role
    }

    const new_user = new User(datas);

    await new_user.save();
    return res.json({
        msg: "User created successfully"
    }).status(200)
} 