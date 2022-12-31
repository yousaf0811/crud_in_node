const express = require("express");
const studentdata = require("../model/users")
const router = express.Router();
const {generateAuthToken} = require('../utils/helpers')


router.get("/get", async (req, res) => {
  const students = await studentdata.find();
  res.status(200).send(students);
});

router.get("/:userId", async (req, res) => {
  const user = await studentdata.findOne({ _id: req.params.userId });
  res.status(200).send(user);
});


router.post("/login", async (req, res) => {
  const user = await studentdata.findOne({ email: req.body.email });
  const pass = await studentdata.findOne({password: req.body.password });

  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  if (!pass) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }

  const token = generateAuthToken({
    username: user.username,
    email: user.email
  });
  const data = {
    username: user.username,
    email: user.email
  }
  console.log("this is your tokens",token)

  res.status(200).send({ message: "success", token, data });
});




router.post("/student_signup", async (req, res) => {
    const payload = req.body;
    let user = new studentdata(payload);
    user = await user.save();
    res.status(200).send({ user });
  });
  module.exports = router;