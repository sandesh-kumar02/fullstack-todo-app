import {
  registerPage,
  userRegister,
  loginUser,
  login,
} from "../controllers/authcontroller.js";


import express from "express";
const router = express.Router();

router.get("/register", registerPage);
router.post("/register", userRegister);
router.post("/login", loginUser);
router.get("/login", login);

export default router;
