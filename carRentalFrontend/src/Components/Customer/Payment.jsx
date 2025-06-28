import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Payment.scss";

function Payment() {
  const [payment, setPayment] = useState(null);
  const [rental, setRental] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    const getRental = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/rental/getByRentalId/" +
            localStorage.getItem("rentalId")
        );
        setRental(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Rental fetch failed", err);
      }
    };
    getRental();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/addPayment/" +
          localStorage.getItem("rentalId")
      );
      setPayment(response.data);
      alert("Payment Success!");
      localStorage.removeItem("rentalId");
      navigate("/customerdashboard")

    } catch (err) {
      console.error("Payment failed", err);
      alert("Payment Failed!");
    }
  };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="card-header">
                    Payment Summary
                </div>
                <div className="card-body">
                    <img
                        src={`/images/${encodeURIComponent(rental?.reservation?.car?.image || "default-car.png")}`}
                        alt="Car"
                    />
                    <p><strong>Start Date:</strong> {rental.start_date}</p>
                    <p><strong>End Date:</strong> {rental.end_date}</p>
                    <p><strong>Total Cost:</strong> ₹{rental.rentalcost}</p>
                </div>
                <div className="card-footer">
                    <button className="btn" onClick={handlePayment}>
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
