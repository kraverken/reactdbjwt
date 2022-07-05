import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let usr = localStorage.getItem("currentUser");
    if (usr) {
      setUser(usr);
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="/home">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">
                About
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/employee">
                Employee
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/empdepdsg">
                Employee Dep-Dsg
              </a>
            </li>
          </ul>
          {user ? (
            <div />
          ) : (
            <Link to={"/register"}>
              <button
                class="btn btn-outline-light my-2 my-sm-0 mr-2"
                type="submit"
              >
                Register
              </button>
            </Link>
          )}
          {user ? (
            <button
              class="btn btn-outline-light my-2 my-sm-0 mr-2"
              type="submit"
              onClick={logOut}
            >
              LogOut
            </button>
          ) : (
            <Link to={"/login"}>
              <button
                class="btn btn-outline-light my-2 my-sm-0 mr-2"
                type="submit"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
