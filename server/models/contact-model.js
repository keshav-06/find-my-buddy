const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
