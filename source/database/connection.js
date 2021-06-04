const mongoose = require("mongoose");

// connect database
mongoose
  .connect("mongodb://localhost:27017/User-Auth", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(`Connection to the DB is Successful.`))
  .catch((err) => console.log(`Connection to the DB is Broken.`));
