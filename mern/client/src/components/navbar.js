import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

  return (
<div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
        <img
          style={{ width: "110%", height: "60px" }}
          src={process.env.PUBLIC_URL + "/rocketLogo.png"}
          alt="logo"
        />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* <NavLink className="nav-link" to="/create">
              Create Record
            </NavLink> */}
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" onClick={handleLogout}>
              Log Out
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

  );
}
