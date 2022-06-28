require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userObj = require("./models/User");
const employeeObj = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// APIS

// REGISTER
app.post("/register", (req, res) => {
  // Duplicate user
  userObj.findOne({ username: req.body.username }).then((d) => {
    if (d) {
      res.json({ status: -2, message: "User is already registered" });
    } else {
      userObj
        .create(req.body)
        .then((d) => {
          if (d) {
            res.json({ status: 1, message: "User registered succesfully" });
          } else {
            res.json({ status: -1, message: "User not registered" });
          }
        })
        .catch((e) => {
          console.log(JSON.stringify(e));
          res.json({ status: 0, message: "Some error occured" });
        });
    }
  });
});

// LOGIN
app.post("/login", (req, res) => {
  userObj
    .findOne(req.body)
    .then((d) => {
      if (d) {
        res.json({ status: 1, message: "User login successful" });
      } else {
        res.json({ status: -1, message: "Wrong username or password" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

// NEW Employee
app.post("/saveEmployee", (req, res) => {
  employeeObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "Employee data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Employee data not saved" });
    });
});

// UPDATE Employee
app.put("/updateEmployee", (req, res) => {
  employeeObj
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((d) => {
      res.json({ status: 1, message: "Employee data updated" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Employee data not updated" });
    });
});

// DELETE Employee
app.delete("/deleteEmployee", (req, res) => {
  employeeObj
    .deleteOne({ _id: req.body._id })
    .then((d) => {
      res.json({ status: 1, message: "Employee data deleted" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Employee data not deleted" });
    });
});

// DISPLAY Employee
app.get("/getEmployee", (req, res) => {
  employeeObj
    .find()
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, message: "data not found" });
    });
});
mongoose.connect(process.env.DB_URL, () => {
  //   console.log("Db connected");
  app.listen(process.env.PORT, () => {
    console.log("database server and app sever running");
  });
});
