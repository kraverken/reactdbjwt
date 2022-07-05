const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  name: String,
});

const depObj = mongoose.model("department", departmentSchema);

module.exports = depObj;
