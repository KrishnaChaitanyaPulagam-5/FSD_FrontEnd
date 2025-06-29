import axios from "axios";
import { useEffect, useState } from "react";
import "../../CSS/Lender/Cars.scss";
import { useNavigate } from "react-router-dom";

function LenderCars() {

    let [cars, setCars] = useState([]);
    let [selectedCar, setSelectedCar] = useState(null);
    let navigate=useNavigate();

    useEffect(() => {
        GetAllLenderCars();
    }, [])

    const GetAllLenderCars = async () => {
        const res = await axios.get(`http://localhost:8080/api/car/getCarsByLender`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        setCars(res.data);
        console.log(res.data);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 offset-9">
                    <div className="card">
                        <button className="btn btn-primary" onClick={()=>{navigate("/addcar")}}>Add New Car</button>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <table className="table table-bordered table-hover lender-table">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Car</th>
                                <th>Model</th>
                                <th>Daily Rate</th>
                                <th>Status</th>
                                <th>Branch</th>
                                <th>Details</th>
                                <th>Edit Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.id}</td>
                                    <td>{record.brand}</td>
                                    <td>{record.model}</td>
                                    <td>{record.dailyrate}</td>
                                    <td>
                                        <span className={`badge ${record.status === "MAINTENENCE" ? 'bg-warning' :
                                            record.status === "AVAILABLE" ? 'bg-success' : 'bg-danger'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td>{record.branch.location}</td>
                                    <td><button className="btn btn-dark" onClick={() => { setSelectedCar(record) }}>Details</button></td>
                                    <td><button className="btn btn-info" onClick={()=>{navigate(`/editlendercar/${record.id}`)}}>Edit Car</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
    )
}
export default LenderCars;