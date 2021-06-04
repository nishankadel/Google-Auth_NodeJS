const mongoose = require("mongoose");

const googleFields = {
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  image: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
};

const googleSchema = new mongoose.Schema(googleFields);

const GoogleUser = mongoose.model("GoogleUser", googleSchema);

module.exports = GoogleUser;
