import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import "../../CSS/Manager/Navbar.scss";

const Sidebar = forwardRef(({ isOpen, hamburgerRef }, ref) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} ref={ref}>
      <div className="sidebar-header">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="profile"
          className="profile"
        />
        <h5>LENDER</h5>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/lenderdashboard">Dashboard</NavLink></li>
        <li><NavLink to="/lenderdashboard/cars">Manage Cars</NavLink></li>
        <li><NavLink to="/lenderdashboard/reservations">Manage Reservations</NavLink></li>
        <li><NavLink to="/lenderdashboard/payments">Payments</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
      </ul>
    </div>
  );
});

export default Sidebar;
