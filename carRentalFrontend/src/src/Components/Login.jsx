import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Password } from 'primereact/password';
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../Store/actions/UserAction";
import "../css/login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const processLogin = async () => {
    let encodedString = window.btoa(username + ":" + password);
    try {
      const response = await axios.get("http://localhost:8080/api/user/token", {
        headers: { Authorization: "Basic " + encodedString },
      });

      let token = response.data.token;
      localStorage.setItem("token", token);

      const details = await axios.get("http://localhost:8080/api/user/details", {
        headers: { Authorization: "Bearer " + token },
      });

      const user = {
        username: username,
        role: details.data.role,
      };
      setUserDetails(dispatch)(user);

      localStorage.setItem("name", details.data.username);

      switch (details.data.role) {
        case "CUSTOMER":
          navigate("/customerdashboard");
          break;
        case "LENDER":
          navigate("/lenderdashboard");
          break;
        case "MANAGER":
          navigate("/managerdashboard");
          break;
        default:
          setMsg("Login Disabled");
      }

      setMsg("Login Success!");
    } catch (err) {
      setMsg("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
  <div className="overlay">
    <div className="login-container">
      <div className="quote-section">
        <h1>“Drive your dreams.”</h1>
        <p>Your gateway to smooth rides and premium rentals.</p>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        {msg && <div className="message">{msg}</div>}
        <div className="form-group">
          <label>Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" />
        </div>
            <div className="form-group">
              <label>Password</label>
              <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
                className="form-control"
              />
            </div>
        <button onClick={processLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/Signup">Signup</Link>
        </p>
      </div>

    </div>
  </div>
</div>

  );
}

export default Login;
