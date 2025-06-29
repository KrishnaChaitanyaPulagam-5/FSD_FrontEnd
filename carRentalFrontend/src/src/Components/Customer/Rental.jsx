import { useEffect, useState } from "react";
import "../../CSS/Rental.scss";
import { useDispatch, useSelector } from "react-redux";
import { setReservations } from "../../Store/actions/ReservationAction";

function Rental() {
  const dispatch = useDispatch();
  const rental1 = useSelector((e) => e.reservation.reservations);
  const [selectedRental, setSelectedRental] = useState(null);

  useEffect(() => {
    setReservations(dispatch)();
  }, []);

  return (
    <div className="rental-container">
      <div className="container-fluid">
        <h2 className="title">Reservation Log</h2>
        <div className="row">
          {rental1.map((c, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card rental-card">
                <div className="card-header rental-header" onClick={() => setSelectedRental(c)}>
                  <img
                    className="rental-image"
                    src={`/images/${c.reservation.car.image || "default-car.png"}`}
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

        {selectedRental && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setSelectedRental(null)}>❌</button>
              <div className="modal-body">
                <h2>{selectedRental.reservation.car.brand} {selectedRental.reservation.car.model}</h2>
                <div className="modal-details">
                  <p><strong>Reservation ID:</strong> {selectedRental.reservation.id}</p>
                  <p><strong>Start Date:</strong> {selectedRental.start_date}</p>
                  <p><strong>End Date:</strong> {selectedRental.end_date}</p>
                  <p><strong>Total Cost:</strong> ₹{selectedRental.rentalcost}</p>
                  <p><strong>Car Category:</strong> {selectedRental.reservation.car.category}</p>
                  <p><strong>Branch:</strong> {selectedRental.reservation.car.branch.location}</p>
                  <p><strong>Status:</strong> {selectedRental.reservation.status}</p>
                </div>
                <div className="modal-image-container">
                  <img
                    src={`/images/${selectedRental.reservation.car.image || "default-car.png"}`}
                    alt="Car"
                    className="modal-car-image"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rental;
