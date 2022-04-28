const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); // for checking authorization
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const user = require("../models/user");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).send({
        err: errorHandler(err),
      });
    }

    user.salt = undefined;
    user.hashed_password = undefined;

    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User doesn't exists! Please Sign up",
      });
    }

    // if user is found make sure the email and password is matched
    // create authentictaion method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email or Password is wrong",
      });
    }

    // Generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as "t" in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return res with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout Success",
  });
};

// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"], // added later
//   userProperty: "auth",
// });

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id === req.auth._id;
  if (user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denied!",
    });
  }
  next();
};
