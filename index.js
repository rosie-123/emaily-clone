const express = require("express");
const authRoutes = require("./routes/authRoutes");
const products = require("./routes/products");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport"); // tell passport to make use of cookies
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", products);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
const PORT = process.env.PORT || 4444;
app.listen(PORT);
