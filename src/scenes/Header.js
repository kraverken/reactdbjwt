import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <Link to={"/login"}>
              <button
                class="btn btn-outline-light my-2 my-sm-0 mr-2"
                type="submit"
              >
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
                Register
              </button>
            </Link>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
