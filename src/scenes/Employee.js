import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";

function Employee() {
  const initData = {
    name: "",
    address: "",
    salary: 0,
  };
  const [employees, setEmployee] = useState([]);
  const [employeeForm, setEmployeeForm] = useState(initData);
  useEffect(() => {
    getAll();
  }, {});
  const changeHandler = (event) => {
    setEmployeeForm({
      ...employeeForm,
      [event.target.name]: event.target.value,
    });
  };

  function getAll() {
    let token = localStorage.getItem("currentUser");
    axios
      .get("http://localhost:8081/getEmployee", {
        headers: { Authorization: token },
      })
      // JWT Token for authentication
      .then((d) => {
        if (d.data.status == 1) {
          setEmployee(d.data.empdata);
        } else {
          alert(d.data.message);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  }
  function editClick(item) {
    setEmployeeForm(item);
  }
  function renderEmployee() {
    let employeeRows = [];
    employees?.map((item) => {
      employeeRows.push(
        <tr>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.salary}</td>
          <td>
            <button
              onClick={() => editClick(item)}
              data-target="#editModal"
              data-toggle="modal"
              className="btn btn-info p-1 m-1"
            >
              Edit
            </button>
            <button
              onClick={() => deleteClick(item._id)}
              className="btn btn-danger p-1 m-1"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return employeeRows;
  }
  const saveClick = () => {
    let token = localStorage.getItem("currentUser");
    axios
      .post("http://localhost:8081/saveEmployee", employeeForm, {
        headers: { Authorization: token },
      })
      .then((d) => {
        if (d.data.status == 1) {
          getAll();
          setEmployeeForm(initData);
        } else {
          alert(d.data.message);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  const updateClick = () => {
    let token = localStorage.getItem("currentUser");
    axios
      .put("http://localhost:8081/updateEmployee", employeeForm, {
        headers: { Authorization: token },
      })
      .then((d) => {
        if (d.data.status == 1) {
          getAll();
        } else {
          alert(d.data.message);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  function deleteClick(id) {
    let token = localStorage.getItem("currentUser");
    axios
      .delete("http://localhost:8081/deleteEmployee", employeeForm, {
        headers: { Authorization: token },
      })
      .then((d) => {
        if (d.data.status == 1) {
          getAll();
        } else {
          alert(d.data.message);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  }
  return (
    <div>
      <Header />
      <h2 className="text-dark text-center p-2">Employee Page</h2>
      <div className="row">
        <div className="col-9">
          <h2 className="text-info text-left p-2">Employee List</h2>
        </div>
        <div className="col-3">
          <button
            className="btn btn-info"
            data-toggle="modal"
            data-target="#newModal"
            onClick={() => {
              setEmployeeForm({});
            }}
          >
            New Employee
          </button>
        </div>
      </div>
      <div className="col-9 p-3 m-3">{renderEmployee()}</div>
      {/* Save */}
      <div class="modal" id="newModal" tabIndex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style={{ backgroundColor: "darkcyan" }}>
              <h5 class="modal-title text-white">New Employee</h5>
              <button class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="form-group row p-2 m-2">
                <label for="textname">Name</label>
                <input
                  id="textname"
                  name="name" //same as in server and function of employee
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="form-group row p-2 m-2">
                <label for="textaddress">Address</label>
                <input
                  id="textaddress"
                  name="address" //same as in server and function of employee
                  type="text"
                  className="form-control"
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="form-group row p-2 m-2">
                <label for="textsalary">Salary</label>
                <input
                  id="textsalary"
                  name="salary" //same as in server and function of employee
                  type="number"
                  className="form-control"
                  onChange={changeHandler}
                ></input>
              </div>
            </div>
            <div class="modal-footer" style={{ backgroundColor: "darkcyan" }}>
              <button
                data-dismiss="modal"
                onClick={saveClick}
                class="btn btn-success"
              >
                Save
              </button>
              <button data-dismiss="modal" class="btn btn-danger">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;
