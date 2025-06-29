import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/BookingForm.scss";

function BookingForm() {
  const { carId } = useParams();
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [customerId, setCustomerId] = useState(null);

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];//converts datetime from 2003-08-22T10:30:45 splits at T and get [0]

  useEffect(() => {
    axios.get("http://localhost:8080/api/customer/getByLogin", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then((res) => {
        setCustomerId(res.data.id);
      })
      .catch((err) => {
        console.error("Customer fetch failed", err);
      });
  }, []);


  const bookCar = async () => {
    if (!startdate || !enddate) {
      alert("Please pick both dates");
      return;
    }
    if (enddate < startdate) {
      alert("Enddate cant be before startdate");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/reservation/add/${customerId}/${carId}`,
        { startdate, enddate },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      const rentalId = response.data.rental;
      localStorage.setItem("rentalId", rentalId);
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

          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              className="form-control"
              value={startdate}
              min={today}
              onChange={e => {
                setStartdate(e.target.value);
                if (e.target.value > enddate) setEnddate("");
              }}
            />
          </div>

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
