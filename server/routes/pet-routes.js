const Pet = require("../models/pet-model");

const router = require("express").Router();

router.post("/", function (req, res) {
  new Pet({
    phone: req.body.phone,
    name: req.body.name,
    species: req.body.species,
    age: req.body.age,
    location: req.body.location,
    vaccination: req.body.vaccination,
    breed: req.body.breed,
    description: req.body.description,
    image: req.body.image,
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
