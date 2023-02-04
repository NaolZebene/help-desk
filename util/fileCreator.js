const fs = require("fs");

const PDFDocument = require("pdfkit");


module.exports.createreportTable = async function (reportTable, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc, reportTable.generalInfo);
    let customerInformationTop = 100;

    generateTitle(doc, customerInformationTop, "Job creation")
    customerInformationTop += 40

    doc.fontSize(10)
        .text("Average number of worker during the month:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(reportTable.average_worker_per_month, 300, customerInformationTop)
        .font("Helvetica")
        .text("Turnover Rate:", 50, customerInformationTop + 15)
        .text(reportTable.turn_over_rate, 300, customerInformationTop + 15)
        .text("Job creation:", 50, customerInformationTop + 30)
        .text(
            reportTable.job_creation,
            300,
            customerInformationTop + 30)
        .text("Cumulative new jobs created EFY 2015: ", 50, customerInformationTop + 45)
        .font("Helvetica")
        .text(reportTable.cumulative_new_jobs_created, 300, customerInformationTop + 45)
        .moveDown();

    generateHr(doc, customerInformationTop + 60);


    customerInformationTop += 70
    generateTitle(doc, customerInformationTop, "Total Number of workers", 13)
    customerInformationTop += 40
    generatereportTable(doc, customerInformationTop, reportTable.Number_of_workers);
    customerInformationTop += 60

    generateTitle(doc, customerInformationTop, "Number of workers hired", 13)
    customerInformationTop += 40
    generatereportTable(doc, customerInformationTop, reportTable.number_of_workers_hired);
    customerInformationTop += 60

    generateTitle(doc, customerInformationTop, "Number of workers fired", 13)
    customerInformationTop += 40
    generatereportTable(doc, customerInformationTop, reportTable.number_of_workers_fired);
    customerInformationTop += 100

    generateTitle(doc, customerInformationTop, "Export and Import Substitute")
    customerInformationTop += 40
    generateimportTable(doc, customerInformationTop, reportTable.import_export)
    customerInformationTop += 100

    generateTitle(doc, customerInformationTop, "On Job Training Certification ")
    customerInformationTop += 40
    generatecertificateTable(doc, customerInformationTop, reportTable.certificate_type)
    customerInformationTop += 100

    doc.end(); generateimportTable
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, data) {
    doc
        .text(`${data.companyName}`, 110, 57)
        .fontSize(10)
        .text(`${data.month}/${new Date().getFullYear()}`, 200, 65, { align: "right" })
        .moveDown();
}


function generateTitle(doc, pos, data, font = 20) {
    doc
        .fillColor("#444444")
        .fontSize(font)
        .font("Helvetica-Bold")
        .text(`${data}`, 50, pos)

    generateHr(doc, pos + 25);

}



function generatereportTable(doc, pos, data) {
    let i;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        pos,
        "Male",
        "Female",
        "Expected",
        "Total",
    );

    generateHr(doc, pos + 20);
    doc.font("Helvetica");

    for (i = 0; i < data.length; i++) {
        const item = data[i];
        const position = pos + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.male,
            item.female,
            item.expected,
            item.total
        );

        generateHr(doc, position + 20);
    }
}



function generateimportTable(doc, pos, data) {
    let i;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        pos,
        "Planned Monthly export",
        "Amount of export (USD)",
        "Monthly import substitute(Local)",
        "Amount import substitute (Birr)",
    );

    generateHr(doc, pos + 20);
    doc.font("Helvetica");

    for (i = 0; i < data.length; i++) {
        const item = data[i];
        const position = pos + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.planned_month,
            item.amount_of_export,
            item.monthly_import,
            item.amount_import
        );

        generateHr(doc, position + 20);
    }
}


function generatecertificateTable(doc, pos, data) {
    let i;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        pos,
        "Certificate Type ",
        "Number of the trainee",
        "Duration of the training",
    );

    generateHr(doc, pos + 20);
    doc.font("Helvetica");

    for (i = 0; i < data.length; i++) {
        const item = data[i];
        const position = pos + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.type,
            item.number,
            item.duration,
        );

        generateHr(doc, position + 20);
    }
}





























/*************************************************************************************************** */
function generateTableRow(
    doc,
    y,
    male,
    female,
    expected,
    total
) {
    doc
        .fontSize(8)
        .text(male, 50, y)
        .text(female, 150, y)
        .text(expected, 280, y, { width: 90, align: "right" })
        .text(total, 370, y, { width: 90, align: "right" })
}



function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}








/**===================================================================================================== */
// function generateFooter(doc) {
//     doc
//         .fontSize(10)
//         .text(
//             "Payment is due within 15 days. Thank you for your business.",
//             50,
//             780,
//             { align: "center", width: 500 }
//         );
// }