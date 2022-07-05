require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userObj = require("./models/User");
const employeeObj = require("./models/Employee");
const jwt = require("jsonwebtoken");
const depObj = require("./models/Department");
const dsgObj = require("./models/Designation");
const empObj = require("./models/emp");

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
            res.json({
              status: 1,
              message: "User registered succesfully",
            });
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
        let data = { userId: d._id };
        // const token
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
        res.json({ status: 1, message: "User login successful", data: token });
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
  var authheader = req.headers.authorization;
  if (authheader != "null") {
    employeeObj
      .create(req.body)
      .then((d) => {
        res.json({ status: 1, message: "Employee data saved" });
      })
      .catch((e) => {
        res.json({ status: -1, message: "Employee data not saved" });
      });
  } else {
    res.json({
      status: 0,
      message:
        "You are not authorized to add employee please login to continue",
    });
  }
});
// UPDATE Employee
app.put("/updateEmployee", (req, res) => {
  var authheader = req.headers.authorization;
  if (authheader != "null") {
    employeeObj
      .updateOne({ _id: req.body._id }, { $set: req.body })
      .then((d) => {
        res.json({ status: 1, message: "Employee data updated" });
      })
      .catch((e) => {
        res.json({ status: -1, message: "Employee data not updated" });
      });
  } else {
    res.json({
      status: 0,
      message:
        "You are not authorized to perform this operation please login to continue",
    });
  }
});
// DELETE Employee
app.delete("/deleteEmployee", (req, res) => {
  var authheader = req.headers.authorization;
  if (authheader != "null") {
    employeeObj
      .deleteOne({ _id: req.body._id })
      .then((d) => {
        res.json({ status: 1, message: "Employee data deleted" });
      })
      .catch((e) => {
        res.json({ status: -1, message: "Employee data not deleted" });
      });
  } else {
    res.json({
      status: 0,
      message:
        "You are not authorized to perform this operation please login to continue",
    });
  }
});
// GET Employee
app.get("/getEmployee", (req, res) => {
  var authheader = req.headers.authorization;
  if (authheader != "null") {
    employeeObj
      .find()
      .then((d) => {
        res.json({ status: 1, data: d });
      })
      .catch((e) => {
        res.json({ status: -1, message: "data not found" });
      });
  } else {
    res.json({
      status: 0,
      message:
        "You are not authorized to view this page please login to continue",
    });
  }
});

// DISPLAY DEPARTMENT
app.get("/getDep", (req, res) => {
  depObj
    .find()
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, data: null });
    });
});
// SAVE DEPARTMENT
app.post("/saveDep", (req, res) => {
  depObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "data not saved" });
    });
});
/*
// UPDATE DEPARTMENT
app.put("/updateDep", (req, res) => {
  depObj
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((d) => {
      res.json({ status: 1, message: "Department data updated" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Department data not updated" });
    });
});
// DELETE DEPARTMENT
app.delete("/deleteDep", (req, res) => {
  depObj
    .deleteOne({ _id: req.body._id })
    .then((d) => {
      res.json({ status: 1, message: "Employee data deleted" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Employee data not deleted" });
    });
});
*/

// DISPLAY DESIGNATION
app.get("/getDsg", (req, res) => {
  dsgObj
    .find()
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, data: null });
    });
});
// SAVE DESIGNATION
app.post("/saveDsg", (req, res) => {
  dsgObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "data not saved" });
    });
});
/*
// UPDATE DESIGNATION
app.put("/updateDsg", (req, res) => {
  dsgObj
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((d) => {
      res.json({ status: 1, message: "Department data updated" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Department data not updated" });
    });
});
// DELETE DESIGNATION
app.delete("/deleteDsg", (req, res) => {
  dsgObj
    .deleteOne({ _id: req.body._id })
    .then((d) => {
      res.json({ status: 1, message: "Employee data deleted" });
    })
    .catch((e) => {
      res.json({ status: -1, message: "Employee data not deleted" });
    });
});
*/

// SAVE EMP
app.post("/saveEmp", (req, res) => {
  empObj
    .create(req.body)
    .then((d) => {
      res.json({ status: 1, message: "Emp data saved" });
    })
    .catch((e) => {
      res.json({ status: -1, message: e.message });
    });
});
// UPDATE EMP
app.put("/updateEmp", (req, res) => {
  empObj
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((d) => {
      res.json({ status: 1, message: "Emp data updated" });
    })
    .catch((e) => {
      res.json({ status: -1, message: e.message });
    });
});
// GET EMP
app.get("/getEmp", (req, res) => {
  empObj
    .find()
    .populate("department")
    .populate("designation")
    .then((d) => {
      res.json({ status: 1, data: d });
    })
    .catch((e) => {
      res.json({ status: -1, data: null });
    });
});

// Connecting database and application server
mongoose.connect(process.env.DB_URL, () => {
  //   console.log("Db connected");
  app.listen(process.env.PORT, () => {
    console.log("database server and app sever running");
  });
});
