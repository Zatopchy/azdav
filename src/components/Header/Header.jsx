import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <header className="navbar-dark bg-dark">
        <div className="container-fluid p-0">
          <div className="row m-0">
            <nav className="navbar navbar-expand-lg col-md-12">
              <button
                className="navbar-toggler ml-4"
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggler"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`collapse navbar-collapse col-md-12 ${s.list_link}`}
                id="navbarToggler"
              >
                <div className="col-md-5">
                  <NavLink className="ml-auto" to="/addusers">
                    <i className="fas fa-user-plus text-white mr-4"></i>
                  </NavLink>

                  <NavLink className="ml-auto" to="/export">
                    <i className="fas fa-download text-white mr-4"></i>
                  </NavLink>

                  <NavLink className="ml-auto" to="/import">
                    <i className="fas fa-upload text-white mr-4"></i>
                  </NavLink>
                </div>

                <div className="col-md-5">
                  <NavLink className="navbar-brand ml-4 p-0" to="/">
                    AzDAV
                  </NavLink>
                </div>

                <NavLink className="ml-auto" to="/settings">
                  <i className="fas fa-cog text-white"></i>
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
