import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {
  const navigate = useNavigate();
  const initData = {
    username: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initData);
  const [loginFormError, setLoginFormError] = useState(initData);

  const changeHandler = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };
  const loginClick = () => {
    let hasError = false;
    let message = initData;

    if (loginForm.username.trim().length === 0) {
      hasError = true;
      message = { ...message, username: "Pls enter username" };
    }
    if (loginForm.password.trim().length === 0) {
      hasError = true;
      message = { ...message, password: "Pls enter password" };
    }
    if (hasError) {
      setLoginFormError(message);
    } else {
      setLoginFormError(initData);
      axios
        .post("http://localhost:8081/login", loginForm)
        .then((d) => {
          if (d.data.status == 1) {
            localStorage.setItem("currentUser", loginForm.username);
            navigate("/employee");
          } else {
            alert(d.data.message);
          }
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="col-lg-6 mx-auto p-2 m-2">
        <div class="card text-center">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div className="form-group row">
              <label className="col-lg-4 text-left">Username</label>
              <div className="col-lg-8">
                <input
                  onChange={changeHandler}
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                />
                <p className="text-danger">{loginFormError.username}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4 text-left">Password</label>
              <div className="col-lg-8">
                <input
                  onChange={changeHandler}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
                <p className="text-danger">{loginFormError.password}</p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button onClick={loginClick} className="btn btn-dark mr-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
