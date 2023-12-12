const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: { type: String },
  department: { type: String },
  position: { type: String },
  salary: { type: Number },
  age: { type: Number },
  gender: { type: String },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
