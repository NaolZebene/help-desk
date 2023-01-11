const Report = require('../model/Report');
const wrapAsync = require('../util/wrapAsync')

module.exports.SubmitReport = wrapAsync(async function (req, res) {
    const data = req.body;
    const newReport = new Report(data);
    newReport.save().then(() => {
        return res.json({
            msg: "Report Sent Successfully"
        }).status(200)
    }).catch((e) => {
        return res.json({
            msg: "Error While sending report"
        }).status(401)
    })
})