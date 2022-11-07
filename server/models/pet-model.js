const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  phone: String,
  name: String,
  species: String,
  age: String,
  location: String,
  vaccination: String,
  breed: String,
  image: String,
});

const Pet = mongoose.model("pet", petSchema);

module.exports = Pet;
