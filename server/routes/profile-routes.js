const router = require("express").Router();
const Pet = require("../models/pet-model");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
