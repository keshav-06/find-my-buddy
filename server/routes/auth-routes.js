const passport = require("passport");

const router = require("express").Router();

router.get("/login", function (req, res) {
  res.render("login", { user: req.user });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/profile");
});

module.exports = router;
