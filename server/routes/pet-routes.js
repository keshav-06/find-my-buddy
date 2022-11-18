const Pet = require("../models/pet-model");

const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var users = require("../config/passport-setup");

const { uploadFile } = require("../config/s3");

router.post("/", upload.single("image"), async function (req, res) {
  const result = await uploadFile(req.file);
  new Pet({
    email: req.user.email,
    petName: req.body.name,
    species: req.body.species,
    age: req.body.age,
    gender: req.body.gender,
    location: req.body.location,
    vaccination: req.body.vaccination,
    breed: req.body.breed,
    description: req.body.description,
    image: result.Location,
  }).save((err, doc) => {
    if (!err) {
      res.redirect("/pet-gallery");
    } else console.log("Error during adding pet : " + err);
  });
  // console.log(JSON.stringify(req.body));
});

router.get("/", function (req, res, next) {
  Pet.find((err, docs) => {
    if (!err) {
      // console.log("Pet gallery: " + docs);
      res.render("pet-gallery", {
        user: req.user,
        data: docs,
      });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
