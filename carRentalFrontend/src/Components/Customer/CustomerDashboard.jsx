import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../CSS/CustomerDashboard.scss";
import { Outlet } from "react-router-dom";

function CustomerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name");

    if (!token || !username) {
      navigate("/", { replace: true }); // 👈 Force redirect to login
    }
  }, []);
  // 👇 Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="dashboard-layout">
      <Navbar onToggle={handleToggleSidebar} hamburgerRef={hamburgerRef} />
      <div className="main-content d-flex">
        <Sidebar isOpen={sidebarOpen} sidebarRef={sidebarRef} />
        <div className={`content-area ${sidebarOpen ? "shifted" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
