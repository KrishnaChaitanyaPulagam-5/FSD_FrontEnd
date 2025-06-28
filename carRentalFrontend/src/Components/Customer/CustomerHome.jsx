import { useEffect, useState } from "react";
import "../../CSS/CustomerHome.scss";
import Stats from "../Stats";
import CUstomerCarStats from "./CUstomerCarStats";

function CustomerHome() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUsername(name);
    }
  }, []);

  return (
    <div className="customer-home-wrapper">
      <div className="customer-home">
        <div className="welcome-text">
          <h2>Welcome back, {username}!</h2>
          <p>Glad to have you back. Explore our latest cars and offers now.</p>
        </div>
        <div className="welcome-img">
          <img src={`/images/profile.jpg`} alt="Welcome Car" />
        </div>
      </div>
      <div className="stats-card-expanded">
        <div className="stats-title">📊 Stats of Cars</div>
        <CUstomerCarStats/>
      </div>
    </div>
  );
}

export default CustomerHome;
