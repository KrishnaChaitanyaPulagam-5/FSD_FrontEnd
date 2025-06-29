import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../CSS/Manager/Navbar.scss";
import { Outlet } from "react-router-dom";

function ManagerDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name");

    if (!token || !username) {
      navigate("/", { replace: true }); // 👈 Force redirect to login
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className={`layout-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        ref={sidebarRef}
        hamburgerRef={hamburgerRef}
      />

      <div className="main-section">
        <Navbar toggleSidebar={toggleSidebar} hamburgerRef={hamburgerRef} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
