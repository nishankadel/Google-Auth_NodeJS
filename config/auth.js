module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please login first");
    res.redirect("/login");
  },

  unEnsuredAuth: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please login first");
    res.redirect("/dashboard");
  },
};
