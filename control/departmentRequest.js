module.exports.CreateTask = async function (req, res) {
    const data = req.body;
    const dep = await Departments.findOne({ title: data.department });
    if (!dep) {
      return res
        .json({
          msg: "No such department",
        })
        .status(401);
    }
    let datas = {
      companyName: data.title,
      description: data.description,
      taskType: data.taskType,
      location: data.location,
      requested_date: data.requested_date,
    };
    const task = new Task(datas);
    task.department = dep;
    await task.save();
    return res
      .json({
        msg: "Task submitted Successfully",
      })
      .status(200);
  };