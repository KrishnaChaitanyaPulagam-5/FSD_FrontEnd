import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../../Store/actions/UserAction";
import { FaBars } from "react-icons/fa";

function Navbar({ onToggle, hamburgerRef }) {
  const [user] = useState(useSelector(state => state.user));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    setUserDetails(dispatch)({ username: "", role: "" });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-light bg-light justify-content-between px-3" style={{ position: "relative", zIndex: 1100 }}>
      <div className="d-flex align-items-center">
        {/* ✅ ref added here */}
        <FaBars ref={hamburgerRef} className="hamburger-icon" onClick={onToggle} style={{ cursor: "pointer", fontSize: "1.5rem" }} />
        <span className="ms-3 fw-bold">Car Rental System</span>
      </div>
      <div className="form-inline mt-2 mb-4">
        Welcome {user.username} - {user.role}
        &nbsp;&nbsp;&nbsp;
        <button className="btn btn-outline-success" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;