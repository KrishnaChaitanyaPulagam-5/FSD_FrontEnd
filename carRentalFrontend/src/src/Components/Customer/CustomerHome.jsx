import { useEffect, useState } from "react";
import "../../CSS/CustomerHome.scss";
import CUstomerCarStats from "./CUstomerCarStats";
import axios from "axios";

function CustomerHome() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("profile.jpg");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/customer/getByLogin", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });

        const data = res.data;
        setUsername(data.name || "User");

        if (data.profilepic) {
          setProfilePic(data.profilepic);
        }
      } catch (err) {
        console.error("Error fetching customer:", err);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <div className="customer-home-wrapper">
      <div className="customer-home">
        <div className="welcome-text">
          <h2>Welcome back, {username}!</h2>
          <p>Glad to have you back. Explore our latest cars and offers now.</p>
        </div>
        <div className="welcome-img">
          <img
            src={`/images/${profilePic}`}
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
      <div className="stats-card-expanded">
        <div className="stats-title">📊 Stats of Cars</div>
        <CUstomerCarStats />
      </div>
    </div>
  );
}

export default CustomerHome;
