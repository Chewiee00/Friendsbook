//Reference: Video Materials from CMSC 100

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
// get user model registered in Mongoose
const User = mongoose.model("User");

const signUp = (req, res) => {
  const newuser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });
  newuser.save((err) => {
    if (err) { console.log(err); return res.send({ success: false }); }
    else { return res.send({ success: true }); }
  });
}

const login = (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      console.log("user doesn't exist");
      return res.send({ success: false });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        console.log("wrong password");
        return res.send({ success: false });
      }
      console.log("Successfully logged in");
      const tokenPayload = {
        _id: user._id
      }
      const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");
      return res.send({ success: true, token, userid: user._id });
    })
  })
}

const checkIfLoggedIn = (req, res) => {
  if (!req.cookies || !req.cookies.authToken) {
    return res.send({ isLoggedIn: false });
  }
  return jwt.verify(
    req.cookies.authToken,
    "THIS_IS_A_SECRET_STRING",
    (err, tokenPayload) => {
      if (err) {
        return res.send({ isLoggedIn: false });
      }
      const userId = tokenPayload._id;
      return User.findById(userId, (userErr, user) => {
        if (userErr || !user) {

          return res.send({ isLoggedIn: false });
        }
        console.log("user is currently logged in");
        return res.send({ isLoggedIn: true });
      });
    });
}

export { signUp, login, checkIfLoggedIn }