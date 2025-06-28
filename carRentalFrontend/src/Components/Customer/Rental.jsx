import axios from "axios";
import { useEffect, useState } from "react";
import "../../CSS/Rental.scss";
import { useDispatch, useSelector } from "react-redux";
import {setReservations} from "../../Store/actions/ReservationAction"

function Rental(){
// let[rental,setRental]=useState([]);

// useEffect(()=>{
//     const getAllReservations=async()=>{
//     try{
//     const response=await axios.get("http://localhost:8080/api/rental/getByLogin",
//         {headers :{"Authorization":"Bearer "+localStorage.getItem('token')}}
//     )
//     console.log(response.data)
//     setRental(response.data)
    
//     }
//     catch(err){

//     }
//     }
//     getAllReservations();
// },[])
const dispatch=useDispatch();
const rental1=useSelector((e)=>{return e.reservation.reservations});

useEffect(()=>{
  setReservations(dispatch)();
},[])
    return (
  <div className="rental-container">
    <div className="container-fluid">
      <div className="row">
        <div className="col=lg-12">
          <br /><br /><br /><br />
        </div>
      </div>
      <h2 className="title" >Reservation Log</h2>
      <div className="row">
        {rental1.map((c, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card rental-card">
              <div className="card-header rental-header">
                <img
                  className="rental-image"
                  src={`/images/${encodeURIComponent(c.reservation.car.image || "default-car.png")}`}
                  alt={`${c.reservation.car.brand} ${c.reservation.car.model}`}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Reservation Id: {c.reservation.id}</h5>
                <p className="card-text">Car: {c.reservation.car.brand} {c.reservation.car.model}</p>
                <p className="card-text">StartDate: {c.start_date}</p>
                <p className="card-text">EndDate: {c.end_date}</p>
                <p className="card-text">Price: ₹{c.rentalcost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
export default Rental;