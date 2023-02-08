const Report = require("../model/Report");
const wrapAsync = require("../util/wrapAsync");
const jwt = require("jsonwebtoken");
const INV_SEC = "investor";

module.exports.SubmitReport = async function (req, res) {
  const token = req.get("Authorization").split(" ")[1];
  const decodedToken = jwt.verify(token, INV_SEC);
  const companyName = decodedToken.name;

  const incoming = req.body;
  const additional_file = req.file.path;
  // console.log(typeof incoming);

  const all_data = {
    month: incoming.month,
    companyName: incoming.companyName,
    // total_number_of_worker: incoming.total_number_of_worker,
    totalMale: incoming.totalMale,
    totalFemale: incoming.totalFemale,
    totalExp: incoming.totalExp,
    totalTotal: incoming.totalTotal,
    hiredMale: incoming.hiredMale,
    hiredFemale: incoming.hiredFemale,
    hiredExp: incoming.hiredExp,
    hiredTotal: incoming.hiredTotal,
    firedMale: incoming.firedMale,
    firedFemale: incoming.firedFemale,
    firedExp: incoming.firedExp,
    firedTotal: incoming.firedTotal,
    cumulative_new_jobs_created: incoming.cumulative_new_jobs_created,
    average_worker_per_month: incoming.average_worker_per_month,
    // number_of_workers_resigned: incoming.number_of_workers_resigned,
    // number_of_workers_hired: incoming.number_of_workers_hired,
    turn_over_rate: incoming.turn_over_rate,
    job_creation: incoming.job_creation,
    planned_monthly_report: incoming.planned_monthly_report,
    amount_of_export: incoming.amount_of_export,
    monthly_import_substitute: incoming.monthly_import_substitute,
    amount_import_substitute: incoming.amount_import_substitute,
    certificate_type: incoming.certificate_type,
    number_of_trainee: incoming.number_of_trainee,
    duration_of_training: incoming.duration_of_training,
    additional_file: additional_file,
    challenges: incoming.challenges,
    to: incoming.departmentName,
    // imageURL: "reportFiles/1.jpg",
  };

  console.log(all_data);
  const newReport = new Report(all_data);
  await newReport.save();
  return res
    .json({
      msg: "Report Sent Successfully",
    })
    .status(200);
};

module.exports.viewReports = wrapAsync(async function (req, res) {
  const { companyName } = req.params;
  const all_datas = await Report.find({ companyName: companyName });
  return res
    .json({
      msg: all_datas,
    })
    .status(200);
});