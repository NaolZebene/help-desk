const Task = require('../model/Tasks');
const mongoose = require('mongoose');
const User = require('../model/Users')

module.exports.CreateTask = async function (req, res) {

    const data = req.body;
    if (!(data.companyName && data.description && data.priority && data.taskType && data.location && data.requested_date && data.contact_person_name && data.contact_person_phone)) {
        return res.json({
            msg: "All inputs are required"
        }).status(401);
    }



    let datas = {
        companyName: data.companyName,
        description: data.description,
        priority: data.priority,
        taskType: data.taskType,
        location: data.location,
        contact_person_phone: data.contact_person_phone,
        contact_person_name: data.contact_person_name,
        requested_date: data.requested_date,
    }


    const task = new Task(datas);
    await task.save();

    return res.json({
        msg: "Task submitted Successfully"
    }).status(200)


}

module.exports.GetTask = async function (req, res) {
    const tasks = await Task.find({ isAssigned: "pending" });
    return res.json({
        msg: tasks,

    }).status(200);
}

module.exports.UpdateTask = async function (req, res) {
    const { id } = req.params
    const data = req.body;
    if (!(data.companyName && data.description && data.priority && data.taskType && data.location && data.requested_date && data.contact_person_name && data.contact_person_phone)) {
        return res.json({
            msg: "All inputs are required"
        }).status(401);
    }

    const updated_data = {
        companyName: data.companyName,
        description: data.description,
        priority: data.priority,
        taskType: data.taskType,
        location: data.location,
        contact_person_phone: data.contact_person_phone,
        contact_person_name: data.contact_person_name,
    }

    const data_exists = await Task.findOneAndUpdate(id, updated_data, { runValidators: true })

    if (data_exists) {
        res.json({
            msg: "Updated Successfully"
        }).status(200)
    }

    return res.json({
        msg: "Such data dont exist"
    }).status(403);
}

module.exports.AssignTask = async function (req, res) {
    const { userId, taskId } = req.params;
    const user_data = await User.findById(userId);

    if (!user_data) {
        return res.json({
            msg: "No Such User"
        }).status(403)
    }


    const task = await Task.findById(taskId);

    if (!task) {
        return res.json({
            msg: "No such task"
        }).status(403)
    }

    task.assignedTo.push(user_data)
    task.isAssigned = "accepted"
    task.isEscalated = false


    await task.save();

    return res.json({
        msg: `Assigned a task to ${user_data.username}`
    }).status(200)

}

module.exports.DeclineTask = async function (req, res) {
    const { taskId } = req.params;
    const data = req.body;
    if (!data.reason) {
        return res.json({
            msg: "Please enter the reason"
        }).status(403)
    }

    const task = await Task.findById(mongoose.Types.ObjectId(taskId));


    if (!task) {
        return res.json({
            msg: "No such task"
        }).status(403)
    }

    task.isAssigned = "canceled";
    task.reason = String(data.reason);
    await task.save();

    return res.json({
        msg: "Task declined Successfully"
    })


}


module.exports.getOneTask = async function (req, res) {
    const { taskId } = req.params;
    const one_task = await Task.findById(taskId);
    if (!one_task) {

        return res.json({
            msg: "Id dont exist"
        }).status(403)
    }

    return res.json({
        msg: one_task
    }).status(200)

}
