const nodemailer = require("nodemailer");

const sendEmail = async function (email, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "naolzebene1@gmail.com",
      pass: "jyaspxgnmxxbphfc",
    },
  });

  await transporter.sendMail({
    from: "naolzebene1@gmail.com",
    to: email,
    subject: subject,
    text: text,
  });
};

module.exports = sendEmail;
