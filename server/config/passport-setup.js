const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./key");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

var user = {};
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("existing User: " + currentUser);
          // module.exports = user;
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            thumbnail: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("new User: " + newUser);
              // module.exports = user;
              done(null, newUser);
            });
        }
      });
    }
  )
);

// module.exports = user;
// {
//   email: "aryan.khubchandani@gmail.com",
//   website: "https://geeksforgeeks.org",
// };
