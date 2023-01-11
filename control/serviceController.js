const Department = require('../model/Departments');
const Services = require('../model/Services')
const wrapAsync = require('../util/wrapAsync');

module.exports.CreateServices = wrapAsync(async function (req, res) {
    const data = req.body;
    const new_service = new Services(data)
    const department = Department.findOne({ title: data.department_name })
    if (!department) {
        return res.jon({
            msg: "There is no such department"
        }).status(401)
    }

    department.services.push(new_service);
    await department.save();
    new_service.department.push(department);
    new_service.save().then(() => {
        res.json({
            msg: "Service Added Successfully"
        }).status(200)
    }).catch((err) => {
        res.json({
            msg: "Error while creating new service"
        })
    }).status(401)

})

module.exports.EditServices = wrapAsync(async function (req, res) {
    const { id } = req.params
    const data = req.body;
    const edited_service = await Services.findOneAndUpdate(id, { data });

    if (!edited_service) {
        return res.json({
            msg: "No such service"
        }).status(401)
    }

    return res.json({
        msg: "Service Updated Successfully"
    }).status(200)
})

module.exports.DeleteService = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const data = req.body;
    const deleted_data = await Services.findById(id);

    if (!deleted_data) {
        return res.json({
            msg: "No Such Service"
        })
    }
    deleted_data.isDeleted = True;
    return res.json({
        msg: "Service Deleted Successfully"
    })
})

module.exports.getOneService = wrapAsync(async function (req, res) {
    const { id } = req.params;
    const data = Services.findById(id);

    if (!data) {
        return res.json({
            msg: "Invalid Id"
        }).status(401)
    }

    return res.json({
        msg: data.populate({ path: "department" })
    }).status(200)

})

module.exports.getAllServices = wrapAsync(async function (req, res) {
    const data = await Services.find()
    return res.json({
        msg: data
    }).status(200)
})