const mongoose = require("mongoose");

const designationSchema = mongoose.Schema({
  name: String,
});

const dsgObj = mongoose.model("designation", designationSchema);

module.exports = dsgObj;
