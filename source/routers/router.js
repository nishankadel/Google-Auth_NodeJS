// importing required modules
const express = require("express");
const services = require("../services/services");
const controller = require("../controller/controller");
const config = require("../../config/auth");
const passport = require("passport");

//creating router
const router = express.Router();

// Routing GET Methods
router.get("/", services.getHomePage);
router.get("/dashboard", config.ensureAuth, services.getDashboardPage);
router.get("/login", config.unEnsuredAuth, services.getLoginPage);
router.get("/register", config.unEnsuredAuth, services.getRegisterPage);
router.get("/logout", controller.getLogoutPage);

// Routing POST methods
router.post("/register", controller.postRegisterPage);
router.post("/login", controller.postLoginPage);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  }),
  (req, res) => {
    res.render("dashboard", { user: req.user });
  }
);

// exporting router
module.exports = router;
