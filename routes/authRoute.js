import express from "express";

import {  login, register } from "../controllers/authController.js";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });



router.post("/register",upload.single("profilePic") , register);
router.post("/login", login);

export default router;
