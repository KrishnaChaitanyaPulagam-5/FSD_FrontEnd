import axios from "axios";
import { useEffect, useState } from "react";
import "../Stats";
import BookingStats from "./BookingStats";
import "../../CSS/Manager/ManagerHome.scss"
import TopCars from "./TopCars";

function ManagerHome() {
    let [name, setname] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name)
            setname(name);
    })
    return (
        <div className="container-fluid">
            <div className="top-section">
                <div className="welcome-text">
                    <h2>Welcome back {name}.</h2>
                    <h3>Hope you're having a great day!</h3>
                </div>
                <div className="welcome-img">
                    <img src={`/images/profile.jpg`} alt="Welcome Car" />
                </div>
            </div>

            <div className="stats-card-expanded">
                <div className="stats-title">📊 Stats of Cars</div>
                <BookingStats />
            </div>
            <div className="stats-card-expanded">
                <div className="stats-title">📊 Top Cars</div>
                <TopCars />
            </div>
        </div>

    )
}
export default ManagerHome;