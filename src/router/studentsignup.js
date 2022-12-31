const express = require("express");
const studentdata = require("../model/users")
const router = express.Router();



router.post("/student_signup", async (req, res) => {
    const payload = req.body;
    let user = new studentdata(payload);
    user = await user.save();
    res.status(200).send({ user });
  });
  module.exports = router;