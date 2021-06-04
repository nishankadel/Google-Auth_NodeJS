// import here
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// post register page
exports.postRegisterPage = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //   check if passwords matched
  if (password !== password2) {
    errors.push({ msg: "Passwords are not matched" });
  }

  //   check length of password
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" });
  }

  // check if errors
  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      name,
      password,
      password2,
    });
  } else {
    // validation pass
    await User.findOne({ email: email }).then((user) => {
      if (user) {
        // user exists
        errors.push({ msg: "Email is already registered " });
        res.render("register", {
          errors,
          email,
          name,
          password,
          password2,
        });
      } else {
        // create new User
        const user = new User({
          name: name,
          email: email,
          password: password,
        });

        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;

            // set password to hash
            user.password = hash;
            user
              .save()
              .then((user) => {
                //   flash messages
                req.flash("success_msg", "Successfully registered, login now.");
                res.redirect("/login");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    });
  }
};

// post login page
exports.postLoginPage = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

// get logout page handle
exports.getLogoutPage = (req, res) => {
  req.logout();
  req.flash("success_msg", "you are logout ");
  res.redirect("/login");
};
