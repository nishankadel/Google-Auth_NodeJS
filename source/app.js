// Importing required modules
const express = require("express");
const router = require("./routers/router");
const ejs = require("ejs");
const path = require("path");
require("./database/connection");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("../config/passport");
require("../config/googleAuth");

// creating express app
const app = express();

// port and host
const port = process.env.PORT || 8000;
const host = "127.0.0.1";

// file paths
const staticPath = path.join(__dirname, "../assets");
const viewsPath = path.join(__dirname, "../templates/views");

// use static files
app.use(express.static(staticPath));

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express session middleware
app.use(
  session({
    secret: "FuckSecret",
    resave: true,
    saveUninitialized: true,
  })
);

// connecting flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("../config/passport")(passport);
require("../config/googleAuth")(passport);

// setting up router
app.use(router);

// setting up view engine
app.set("view engine", "ejs");

// setting up views path
app.set("views", viewsPath);

// running server
app.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}/`)
);
