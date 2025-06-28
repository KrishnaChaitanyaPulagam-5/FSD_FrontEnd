import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../CSS/Manager/Car.scss";

function Car() {

  let [car, setCar] = useState([])
  let [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCars = async () => {
      let response = await axios.get("http://localhost:8080/api/car/getall");
      console.log(response.data);
      setCar(response.data);
    }
    getAllCars();
  }, [])


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 offset-10">
          
            <button className="btn btn-primary" onClick={() => { navigate("/addcompanycar") }}>Add New Car</button>
          
        </div>
      </div>
      <div className="row mt-4">
        {car.map((c) => (
          <div className="col-md-3 mb-4" key={c.id}>
            <div className="card">
              <div className="card-header">
                <div className="car-image">
                  <img
                    src={`/images/${c.image || "default-car.png"}`}
                    alt={`${c.brand} ${c.model}`}
                  />
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{c.brand} {c.model}</h5>
                <p className="card-text">Category: {c.category}</p>
                <p className="card-text">Year: {c.year}</p>
                <p className="card-text">Branch: {c.branch.location}</p>
                <p className="card-text">Status: {c.status}</p>
                <p className="card-text">Rate: ₹{c.dailyrate}</p>
              </div>
              <div className="card-footer">
                <div className="button-group">
                  <button className="btn btn-primary" onClick={() => setSelectedCar(c)}>
                    View Details
                  </button>
                  <Link
                    to="/editcar"
                    state={{ id: c.id }}
                    className="btn btn-secondary"
                  >
                    Edit Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedCar(null)}>❌</button>
            <div className="modal-body">
              <h2>{selectedCar.brand} {selectedCar.model}</h2>
            </div>
            <div className="modal-body">
              <div className="modal-details">
                <p><strong>Acceleration (0-60):</strong> {selectedCar.carStats.acceleration} sec</p>
                <p><strong>Top Speed:</strong> {selectedCar.carStats.topSpeed} km/h</p>
                <p><strong>Torque:</strong> {selectedCar.carStats.torque} N</p>
                <p><strong>Horsepower:</strong> {selectedCar.carStats.horsepower} bhp</p>
                <p><strong>Drive Terrain:</strong> {selectedCar.carStats.drivetrain}</p>
                <p><strong>Transmission:</strong> {selectedCar.carStats.transmission}</p>
                <p><strong>Engine:</strong> {selectedCar.carStats.engineType}</p>
                <p><strong>Mileage:</strong> {selectedCar.carStats.mileage} kms/ltr</p>
              </div>
              <div className="modal-image-container">
                <img
                  src={`/images/${selectedCar.image ? selectedCar.image : "default-car.png"}`}
                  alt={`${selectedCar.brand} ${selectedCar.model}`}
                  className="modal-car-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Car;