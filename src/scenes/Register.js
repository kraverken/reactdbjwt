import React from "react";
import { useState } from "react";

function Register() {
  const initData = {
    username: "",
    password: "",
    confirmpassword: "",
  };
  const [registerForm, setRegisterForm] = useState(initData);
  const [registerFormError, setRegisterFormError] = useState(initData);

  const changeHandler = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const registerClick = () => {
    let hasError = false;
    let message = initData;

    if (registerForm.username.trim().length == 0) {
      hasError = true;
      message = { ...message, username: "Pls enter username" };
    }
    if (registerForm.password.trim().length == 0) {
      hasError = true;
      message = { ...message, password: "Pls enter password" };
    }
    if (registerForm.confirmpassword.trim().length == 0) {
      hasError = true;
      message = {
        ...message,
        confirmpassword: "Pls enter password once again",
      };
    }
    if (registerForm.password != registerForm.confirmpassword) {
      hasError = true;
      message = { ...message, confirmpassword: "Passwords dont match" };
    }
    if (hasError) {
      setRegisterFormError(message);
    } else {
      setRegisterFormError(initData);
      // axios
    }
  };

  return (
    <div>
      <div className="col-lg-6 mx-auto p-2 m-2">
        <div class="card text-center">
          <div class="card-header">Register</div>
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
                <p className="text-danger">{registerFormError.username}</p>
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
                <p className="text-danger">{registerFormError.password}</p>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-4 text-left">Confirm Password</label>
              <div className="col-lg-8">
                <input
                  onChange={changeHandler}
                  type="password"
                  className="form-control"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                />
                <p className="text-danger">
                  {registerFormError.confirmpassword}
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            <button onClick={registerClick} className="btn btn-dark">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
