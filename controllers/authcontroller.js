import User from "../models/user.models.js";
import express from "express";
import passport from "passport";
const router = express.Router();

export const registerPage = (req, res) => {
  res.render("register");
};

export const userRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await new User({
      username: username,
      email: email,
    });
    let result = await User.register(user, password);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("User:", user);
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

export const login = (req, res) => {
  res.render("login");
};

export default router;
