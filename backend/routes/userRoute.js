const express = require("express");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) res.send({ msg: "Something went wrong", error: error.message });
      else {
        const user = new userModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "New user has been registered" });
      }
    });
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.send("Invalid User and Password");
    }
    if (!user.email && !user.password) {
      return res.send("Invalid User and Password");
    }

    const valid =  bcrypt.compareSync(req.body.pass, user.pass);
    if (valid) {
      const token = jwttoken.sign({ id: user._id }, process.env.SECRET_CODE);
      res.send({ message: "Login Successs", user, token: token });
    } else {
      res.send({ message: "Invalid access" });
    }
  } catch (error) {
    res.send({ msg: "user not found", error: error.message });
  }
});

module.exports = userRouter;
