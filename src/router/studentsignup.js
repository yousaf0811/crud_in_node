const express = require("express");
const studentdata = require("../model/users")
const router = express.Router();
const {generateAuthToken} = require('../utils/helpers')
const authHandler = require ('../middleware/auth')
//Get All Users 
router.get("/users", async (req, res) => {
  const students = await studentdata.find();
  res.status(200).send(students);
});
//Get User By ID
router.get("/:userId", async (req, res) => {
  const user = await studentdata.findOne({ _id: req.params.userId });
  res.status(200).send(user);
});
//Login 
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
    email: user.email,
    // token: user.token
  }
  
  await studentdata.findOneAndUpdate({_id: user._id},{token : token})
  //console.log("this is your tokens",token)

  res.status(200).send({ message: "success", token, data });
});
//Get User by ID and Edit
router.put("/:userId/edit",authHandler,async (req,res)=>{
  console.log ('body', req.body ,req.params.userId)
    try {
        const user = await studentdata.findOneAndUpdate({_id: req.params.userId}, req.body);
        console.log('json',user)
        res.json({ data: user, status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});
//Delete User with ID
router.delete("/:userId/delete",authHandler,async (req,res)=>{

  try {
      const user = await studentdata.findByIdAndDelete(req.params.userId);
      res.json({ data: user, status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
//Signup New User
router.post("/student_signup", async (req, res) => {
    const payload = req.body;
    let user = new studentdata(payload);
    user = await user.save();
    res.status(200).send({ user });
  });
  module.exports = router;