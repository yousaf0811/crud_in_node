const mongoose = require("mongoose");
const studentsignupSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  course: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token:String
});
const studentdata = mongoose.model("studentsignupdata", studentsignupSchema);
module.exports = studentdata;