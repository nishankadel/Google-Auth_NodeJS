// import required moudles
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const GoogleUser = require("../source/model/GoogleUser");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "955386353525-7b3r7t60o5oslnbjcp6hff56osq428q5.apps.googleusercontent.com",
        clientSecret: "nC29JVjlx4Dcc5jH4wuGKFIk",
        callbackURL: "http://localhost:8000/google/callback",
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        //get the user data from google
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          //find the user in our database
          let user = await GoogleUser.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            user = await GoogleUser.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    GoogleUser.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
