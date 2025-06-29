import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../CSS/Manager/PaycheckDetails.scss"

function PaycheckDetails() {
    const { id } = useParams();
    const [paycheckDetails, setPaycheckDetails] = useState(null);

    useEffect(() => {
        const fetchPaycheckDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/paycheck/getByRentalId/${id}`, {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
                });
                console.log(res.data);
                setPaycheckDetails(res.data);
            } catch (error) {
                console.error("Failed to fetch paycheck details", error);
            }
        };
        fetchPaycheckDetail();
    }, [id]);

    // Guard clause: don't render details until data is available
    if (!paycheckDetails) {
        return <p>Loading paycheck details...</p>;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="paycheck-card">
                    <div className="card-header">
                        <h1>Paycheck Details</h1>
                    </div>
                    <div className="card-body">
                        <div className="details">
                            <p><strong>Rental ID:</strong> {id}</p>
                            <p>
                                <strong>Lender:</strong> {paycheckDetails.lender?.name || "COMPANY"}
                            </p>
                            <p><strong>Amount:</strong> ₹{paycheckDetails.amount}</p>
                            <p><strong>Status:</strong> {paycheckDetails.paymentstatus}</p>
                            <p>
                                <strong>Payment Date:</strong> {paycheckDetails.paymentdate || "Not Paid Yet"}
                            </p>
                            <p>
                                <strong>Car:</strong> {paycheckDetails.car?.brand} {paycheckDetails.car?.model}
                            </p>
                        </div>
                        <div className="image-container">
                            <img
                                src={`/images/${paycheckDetails.car?.image? paycheckDetails.car.image:"default-car.png"}`}
                                alt={`${paycheckDetails.car?.brand} ${paycheckDetails.car?.model}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaycheckDetails;
