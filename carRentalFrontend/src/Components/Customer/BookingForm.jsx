import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/BookingForm.scss";

function BookingForm() {
  const { carId } = useParams();
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate]   = useState("");
  const [customerId, setCustomerId] = useState(null);

  const navigate = useNavigate();

  // 👉 today in yyyy‑mm‑dd (what <input type="date"> expects)
  const today = new Date().toISOString().split("T")[0];

  /* ----- fetch logged‑in customer once ----- */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/customer/getByLogin",
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        );
        console.log(res.data);
        setCustomerId(res.data.id);
      } catch (err) {
        console.error("Customer fetch failed", err);
      }
    })();
  }, []);

  /* ----- book car ----- */
  const bookCar = async () => {
    if (!startdate || !enddate) {
      alert("Please pick both dates");
      return;
    }
    if (enddate < startdate) {
      alert("End‑date can’t be before start‑date");
      return;
    }

    try {
      const response=await axios.post(
        `http://localhost:8080/api/reservation/add/${customerId}/${carId}`,
        { startdate, enddate },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      const rentalId=response.data.rental;
      localStorage.setItem("rentalId",rentalId);
      alert("Reservation started. Proceed to payment.");
      navigate("/payment");
    } catch (err) {
      console.error("Booking failed", err);
      if (err.response && err.response.data) {
        alert("Booking failed: " + err.response.data.message);
      } else {
        alert("Booking failed!");
      }
    };
  }

  return (
    <div className="booking-form-container">
      <div className="form-card">
        <div className="container">
          <h3 className="mt-4">Book Car ID: {carId}</h3>

          {/* Start date */}
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              className="form-control"
              value={startdate}
              min={today}
              onChange={e => {
                setStartdate(e.target.value);
                // 👇 reset end‑date if it became invalid
                if (e.target.value > enddate) setEnddate("");
              }}
            />
          </div>

          {/* End date */}
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              className="form-control"
              value={enddate}
              min={startdate || today}
              onChange={e => setEnddate(e.target.value)}
              disabled={!startdate}
            />
          </div>

          <button className="btn btn-success mt-3" onClick={bookCar}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>

    
  );
}

export default BookingForm;
