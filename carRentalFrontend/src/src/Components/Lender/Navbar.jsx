import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../Store/actions/UserAction";
import { FaBars } from "react-icons/fa";
import "../../CSS/Manager/Navbar.scss";

function Navbar({ toggleSidebar, hamburgerRef }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    setUserDetails(dispatch)({ username: "", role: "" });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="top-navbar">
      <div className="left-section">
        <FaBars
          ref={hamburgerRef}
          className="hamburger-icon"
          onClick={toggleSidebar}
        />
        <h4 className="navbar-title">Lender Panel</h4>
      </div>
      <div className="right-section">
        Welcome {user.username} - {user.role}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
