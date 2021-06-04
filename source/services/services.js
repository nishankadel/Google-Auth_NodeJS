// import here
const passport = require("passport");
// get home page
exports.getHomePage = (req, res) => res.render("index");

// get home page
exports.getDashboardPage = (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
};

// get login page
exports.getLoginPage = (req, res) => res.render("login");

// get register page
exports.getRegisterPage = (req, res) => res.render("register");
