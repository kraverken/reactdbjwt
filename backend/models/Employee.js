const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: String,
  address: String,
  salary: Number,
});

const employeeObj = mongoose.model("employee", employeeSchema);

module.exports = employeeObj;
