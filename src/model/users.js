const mongoose = require("mongoose");

const studentsignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max:20,
    min:4,
  },
  address: {
    type: String,
    required: true,
    max:30,
    min:2,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password:{
    type: String,
    required: true,
    max:20,
    min:4,
  }
});

const studentdata = mongoose.model("studentsignupdata", studentsignupSchema);

module.exports = studentdata;