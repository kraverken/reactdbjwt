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
    axios
      .post("http://localhost:8081/saveEmployee", employeeForm)
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
    axios
      .put("http://localhost:8081/updateEmployee", employeeForm)
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
    axios
      .delete("http://localhost:8081/deleteEmployee", employeeForm)
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
    </div>
  );
}

export default Employee;
