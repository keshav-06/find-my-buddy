const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  email: String,
  petName: String,
  species: String,
  age: String,
  gender: String,
  location: String,
  vaccination: String,
  breed: String,
  description: String,
  image: String,
});

const Pet = mongoose.model("pet", petSchema);

module.exports = Pet;
