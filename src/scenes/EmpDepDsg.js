import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";

function EmpDepDsg() {
  const [employees, setEmployees] = useState([]);
  const [employeeForm, setEmployeeForm] = useState({});
  const [deps, setDeps] = useState(null);
  const [desgs, setDesgs] = useState(null);

  useEffect(() => {
    getDeps();
    getDsg();
    getEmps();
  }, {});

  function getDeps() {
    axios.get("http://localhost:8081/getDep").then((d) => {
      if (d) {
        setDeps(d.data.data);
      }
    });
  }
  function getDsg() {
    axios.get("http://localhost:8081/getDsg").then((d) => {
      if (d) {
        setDesgs(d.data.data);
      }
    });
  }
  function getEmps() {
    axios.get("http://localhost:8081/getEmp").then((d) => {
      if (d) {
        setEmployees(d.data.data);
      }
    });
  }
  function renderDeps() {
    if (deps) {
      let deparr = [];
      deparr.push(<option value="-1">Select Department</option>);
      deps?.map((item) => {
        deparr.push(
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      });

      if (deparr.length > 0) {
        return (
          <select
            onChange={changeHandler}
            name="department"
            value={employeeForm?.department ? employeeForm.department : "-1"}
            className="form-control"
          >
            {deparr}
          </select>
        );
      }
    }
  }
  function renderDsgs() {
    if (desgs) {
      let dsgarr = [];
      dsgarr.push(<option value="-1">Select Department</option>);
      desgs?.map((item) => {
        dsgarr.push(<option value={item._id}>{item.name}</option>);
      });

      if (dsgarr.length > 0) {
        return (
          <select
            onChange={changeHandler}
            name="designation"
            value={employeeForm?.designation ? employeeForm.designation : "-1"}
            className="form-control"
          >
            {dsgarr}
          </select>
        );
      }
    }
  }
  const changeHandler = (event) => {};
  const saveClick = () => {};
  return (
    <div>
      <Header />
      <h2 className="text-dark text-center p-2">
        Employee Department Designation
      </h2>
      <div className="row">
        <div className="col-9">
          <h2 className="text-info text-left p-2">Emp List</h2>
        </div>
        <div className="col-3">
          <button
            className="btn btn-info"
            data-toggle="modal"
            data-target="#newModal"
            // onClick={() => {
            //   setEmployeeForm({});
            // }}
          >
            New Emp
          </button>
        </div>
      </div>
      {/* <div className="col-9 p-3 m-3">{renderEmployee()}</div> */}
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
                  placeholder="Enter Name"
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
                  placeholder="Enter address"
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
                  placeholder="Enter Salary"
                ></input>
              </div>
              <div className="form-group row p-2 m-2">
                <label for="department">Department</label>
                {renderDeps()}
              </div>
              <div className="form-group row p-2 m-2">
                <label for="designation">Designation</label>
                {renderDsgs()}
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

export default EmpDepDsg;
