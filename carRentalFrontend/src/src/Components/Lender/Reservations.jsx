import axios from "axios";
import { useEffect, useState } from "react";
import "../../CSS/Lender/Reservation.scss"
import { useDispatch, useSelector } from "react-redux";
import { setLenderReservations } from "../../Store/actions/ReservationLenderAction";

function CheckReservations() {
    const dispatch=useDispatch();
    const reservations=useSelector((e)=>{return e.lenderReservation.lenderReservations});
    let [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        setLenderReservations(dispatch)();
    },[])

    // Filter logic
    const filteredReservations = reservations.filter(r =>
        `${r.reservation.car.brand} ${r.reservation.car.model} ${r.reservation.status}`
        .toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h4>Search by Car</h4>
            <input
                type="text"
                placeholder="Search by car brand or model or status..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
            />

            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Customer Contact</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Car</th>
                        <th scope="col">Income</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map((r, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{r.reservation.customer.name}</td>
                            <td>{r.reservation.customer.contactinfo}</td>
                            <td>{r.reservation.startdate}</td>
                            <td>{r.reservation.enddate}</td>
                            <td>{r.reservation.car.brand} {r.reservation.car.model}</td>
                            <td>{r.rentalcost}</td>
                            <td>
                                <span className={`badge ${r.reservation.status === "BOOKED" ? "bg-primary" :
                                        r.status === "COMPLETED" ? "bg-success" :
                                        r.status === "CANCELLED" ? "bg-danger" :
                                        "bg-secondary"}`}>
                                    {r.reservation.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CheckReservations;
