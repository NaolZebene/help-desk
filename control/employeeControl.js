const Task = require('../model/Tasks');

module.exports.EscalateTask = async function (req, res) {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
        return res.json({
            msg: "No such task"
        }).status(403)
    }

    task.assignedTo = [];
    task.isEscalated = true;

    await task.save();

    return res.json({
        msg: "Escalated Task Successfully",
    }).status(200)
}