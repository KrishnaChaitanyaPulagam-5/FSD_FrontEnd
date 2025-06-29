import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import "../../CSS/Manager/Navbar.scss";

const Sidebar = forwardRef(({ isOpen, hamburgerRef }, ref) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} ref={ref}>
      <div className="sidebar-header">
        <img
          src="/images/profile.jpg"
          alt="profile"
          className="profile"
        />
        <h5>Manager</h5>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/managerdashboard">Dashboard</NavLink></li>
        <li><NavLink to="/managerdashboard/cars">Manage Cars</NavLink></li>
        <li><NavLink to="/managerdashboard/reservations">Manage Reservations</NavLink></li>
        <li><NavLink to="/managerdashboard/payments">Payments</NavLink></li>
      </ul>
    </div>
  );
});

export default Sidebar;
