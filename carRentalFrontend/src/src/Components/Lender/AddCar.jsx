import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCar() {

    const [branches, setBranches] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [year, setYear] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [dailyrate, setDailyrate] = useState("");
    const [image, setImage] = useState(""); 

    const [acceleration, setAcceleration] = useState("");
    const [topSpeed, setTopSpeed] = useState("");
    const [torque, setTorque] = useState("");
    const [horsepower, setHorsepower] = useState("");
    const [drivetrain, setDrivetrain] = useState("");
    const [transmission, setTransmission] = useState("");
    const [engineType, setEngineType] = useState("");
    const [engineDisplacement, setEngineDisplacement] = useState("");
    const [mileage, setMileage] = useState("");
    const [seatingCapacity, setSeatingCapacity] = useState("");
    const [doors, setDoors] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [weight, setWeight] = useState("");
    const navigate=useNavigate();


    useEffect(() => {
        const Lender = async () => {
            const res = await axios.get("http://localhost:8080/api/lender/getByLogin",
                { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
            )
            console.log(res.data);
            localStorage.setItem("lenderId", res.data.id);
        }
        Lender();
    }, [])

    useEffect(() => {
        const AllBranches = async () => {
            const res = await axios.get("http://localhost:8080/api/branch/getall")
            console.log(res.data);
            setBranches(res.data);
        }
        AllBranches();
    }, [])


    const AddNewCar = async () => {
        const result = await axios.post(`http://localhost:8080/api/car/add/${localStorage.getItem("lenderId")}/${selectedBranchId}`,
            {
                'brand': brand,
                'model': model,
                'category': category,
                'year': year,
                'licenseNumber': licenseNumber,
                'dailyrate': dailyrate,
                'source': "LENDER",
                'status': "AVAILABLE",
                'image': image,
                'carStats': {
                    'acceleration': acceleration,
                    'topSpeed': topSpeed,
                    'torque': torque,
                    'horsepower': horsepower,
                    'drivetrain': drivetrain,
                    'transmission': transmission,
                    'engineType': engineType,
                    'engineDisplacement': engineDisplacement,
                    'mileage': mileage,
                    'seatingCapacity': seatingCapacity,
                    'doors': doors,
                    'fuelType': fuelType,
                    'weight': weight
                }
            },{headers : {Authorization : "Bearer "+localStorage.getItem("token")}})
            console.log(result.data);
            navigate("/lenderdashboard/cars")
    }



    return (
        <div className="container-fluid">
            <div className="row mb-4">
                <div className="col-lg-12 text-center">
                    <h2>ADD NEW CAR</h2>
                </div>
            </div>

            <div className="card p-4">
                <div className="card-body row g-4">
                    {/* Car Basic Details */}
                    <div className="col-md-6">
                        <label>Car Brand:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setBrand(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Car Model:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setModel(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Category:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setCategory(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Year:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setYear(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>License Number:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setLicenseNumber(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Daily Rate:</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setDailyrate(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Fuel Type:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setFuelType(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Branch Location:</label>
                        <select
                            className="form-select"
                            value={selectedBranchId}
                            onChange={(e) => setSelectedBranchId(e.target.value)}
                            required
                        >
                            <option value="">Select branch</option>
                            {branches.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name} – {b.location}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                    <div className="col-md-6">
                        <label>Acceleration (0-60):</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setAcceleration(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Top Speed (km/h):</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setTopSpeed(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Torque (Nm):</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setTorque(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Horsepower (bhp):</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setHorsepower(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Drivetrain:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setDrivetrain(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Transmission:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setTransmission(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Engine Type:</label>
                        <input type="text" required className="form-control" onChange={(e)=>{setEngineType(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Engine Displacement (L):</label>
                        <input type="number" step="0.1" required className="form-control" onChange={(e)=>{setEngineDisplacement(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Mileage (km/l):</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setMileage(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Seating Capacity:</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setSeatingCapacity(e.target.value)}}/>
                    </div>
                    <div className="col-md-6">
                        <label>Weight (kg):</label>
                        <input type="number" required className="form-control" onChange={(e)=>{setWeight(e.target.value)}}/>
                    </div>

                    {/* Image Upload */}
                    <div className="col-md-6">
                        <label>Car Image:</label>
                        <input type="file" accept="image/*" className="form-control" onChange={(e)=>{setImage(e.target.value)}} />
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-sucess" onClick={() => { AddNewCar() }}>Add Car</button>
                </div>
            </div>
        </div>
    );
}

export default AddCar;
