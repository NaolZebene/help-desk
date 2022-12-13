const Department = require('../model/Departments')

module.exports.CreateDepartment = async function (req, res) {
    const data = req.body;

    if (!data.title) {
        res.json({
            msg: "Department data is required"
        }).status(403)
    }

    const datas = {
        title: data.title
    }


    const newDepartment = new Department(datas);
    await newDepartment.save();

    return res.json({
        msg: "Created A department Successfully"
    }).status(200);

}

module.exports.EditDepartment = async function () {
    const data = req.body;
    const { id } = req.id

    if (!data.title) {
        res.json({
            msg: "Department data is required"
        }).status(403)
    }

    const datas = {
        title: data.title
    }

    const data_exists = await Department.findOneAndUpdate(id, datas, { runValidators: true });

    if (!data_exists) {
        return res.json({
            msg: "No Such Department"
        }).status(403)
    }

    return res.json({
        msg: "Department Updated Successfully"
    }).status(200)

}

module.exports.DeleteDepartment = async function (req, res) {
    const { id } = req.params;
    const data = await Department.findById(id);

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
}

module.exports.GetDepartments = async function (req, res) {
    const data = await Department.find({ isDeleted: false });
    res.json({
        msg: data
    }).status(200)
}