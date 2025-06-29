import React from "react";
import { FaHome, FaBook, FaCar } from "react-icons/fa";
import "../../CSS/Sidebar.scss";
import { Link } from "react-router-dom";
import { MdEventAvailable } from "react-icons/md";
import { FaArrowsTurnRight } from "react-icons/fa6";

function Sidebar({ isOpen, sidebarRef }) {
  return (
    <>
      {isOpen && (
        <div className="sidebar open" ref={sidebarRef}>
          <div className="top-section">
            <div className="logo">L</div>
          </div>
          <ul className="menu">
            <li><FaHome /><span><Link to="/customerdashboard">CustomerDashboard</Link></span></li>
            <li><FaBook /><span><Link to="getReservations">Reservations</Link></span></li>
            <li><FaCar /><span><Link to="searchCars">Cars</Link></span></li>
            <li><MdEventAvailable /><span><Link to="newReservation">Booking</Link></span></li>
            <li><FaArrowsTurnRight/><span><Link to="returns">Return</Link></span></li>
            <li><FaArrowsTurnRight/><span><Link to="updateCustomer">Edit Details</Link></span></li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
