const nodemailer = require("nodemailer");
const keys = require("./key");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: keys.mail.user,
    pass: keys.mail.pass,
  },
});

const sendMail = (contact) => {
  transporter.sendMail(
    {
      from: keys.mail.user,
      to: contact.email,
      subject: "Find My Buddy Customer Support",
      text:
        "Hey " +
        contact.name +
        ", \nOur team has received your message and the customer support will get back to you as soon as possible regarding your query.",
    },
    (error, response) => {
      if (error) {
        console.log(error);
      }
      console.log(response);
    }
  );
};

module.exports = sendMail;
