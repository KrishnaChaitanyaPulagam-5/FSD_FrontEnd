import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/NewReservation.scss";

function NewReservation() {
  const [cars, setCars] = useState([]);
  const [location,setLocation]=useState("");

    const fetchAvailableCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/car/searchByBranch/"+location);
        setCars(response.data);
      } catch (err) {
        console.error("Error fetching cars", err);
      }
    };


  return (
    <div className="reservation-container">
      <div className="row mt-5 mb-4">
        <div className="col-lg-12 d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-25 me-2"
            placeholder="Enter the start Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchAvailableCars}>Search</button>
        </div>
      </div>
      <div className="container">
        <h2 className="title">Available Cars</h2>
        <div className="row">
          {cars.map((car) => (
            <div className="col-md-3 mb-4" key={car.id}>
              <div className="card reservation-card">
                <div className="card-header reservation-img-container">
                  <img
                    src={`/images/${car.image || "default-car.png"}`}
                    alt={`${car.brand} ${car.model}`}
                    className="reservation-image"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{car.brand} {car.model}</h5>
                  <p className="card-text">Type: {car.category}</p>
                  <p className="card-text">Rent per Day: ₹{car.dailyrate}</p>
                  <Link to={`/customerdashboard/book/${car.id}`} className="btn btn-primary w-100">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewReservation;
