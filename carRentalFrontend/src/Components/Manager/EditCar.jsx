import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function EditCar(){
    const {state}=useLocation();
    const carId=state?.id;
    const[status,setCarStatus]=useState("");
    const[dailyrate,setDailyRate]=useState("");
    const navigate=useNavigate();

    const updateCar=async()=>{
        try{
        const res=await axios.put("http://localhost:8080/api/car/update/"+carId,
            {
                status,dailyrate
            },
            {headers:{Authorization: "Bearer "+localStorage.getItem("token")}}
        )
        console.log(res.data);
        if(status!==null){
        setCarStatus(res.data.status);}
        if(dailyrate!==null)
            setDailyRate(res.data.dailyrate)
        navigate("/managerdashboard")

    }catch(err){
        alert(err.msg)
    }
        
    }

    return(
        <div className="card mb-3">
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setCarStatus(e.target.value)}
                    >
                        <option value="">-- Select Status --</option>
                        <option value="AVAILABLE">Available</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="MAINTENENCE">Under Maintenance</option>
                        <option value="BOOKED">Booked</option>
                        <option value="UNAVAILABLE">UnAvailable</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Daily Rate (₹)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={dailyrate}
                        onChange={(e) => setDailyRate(e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>

                <button className="btn btn-success" onClick={updateCar}>Update Car</button>
                
          
            </div>
        </div>
    )
}
export default EditCar;