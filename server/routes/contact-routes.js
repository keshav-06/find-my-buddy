const Contact = require("../models/contact-model");
const router = require("express").Router();

const sendMail = require("../config/mailer");

router.post("/", async function (req, res) {
  new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
  }).save((err, doc) => {
    if (!err) {
      console.log("Your message has been sent!");
      res.redirect("/");
      sendMail(req.body);
    } else console.log("Error during sending the message: " + err);
  });
});

module.exports = router;
