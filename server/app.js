const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const petRoutes = require("./routes/pet-routes");
const contactRoutes = require("./routes/contact-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/key");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/upload", petRoutes);
app.use("/contact", contactRoutes);
app.use("/pet-gallery", petRoutes);
app.get("/about");

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/about", function (req, res) {
  res.render("about", { user: req.user });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
