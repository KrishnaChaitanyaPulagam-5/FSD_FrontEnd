import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Paychecks() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (filterStatus) {
            setFilteredRecords(records.filter(r => r.paymentstatus === filterStatus));
        } else {
            setFilteredRecords(records);
        }
    }, [filterStatus, records]);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/paycheck/getAll", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            const dataWithFallbacks = res.data.map(item => ({
                ...item,
                lender: item.lender || { name: "Company" }
            }));
            setRecords(dataWithFallbacks);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    const handlePayNow = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/paycheck/payToLender/${id}`, {}, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            fetchData();
        } catch (err) {
            alert("Payment failed");
        }
    };

    return (
        <div className="container mt-4">
            <h5>Paycheck Records</h5>

            {/* Simple dropdown filter */}
            <div className="mb-3">
                <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
                <select
                    id="statusFilter"
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="PENDING">PENDING</option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Lender</th>
                            <th>Payment Date</th>
                            <th>Rental ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.lender.name}</td>
                                <td>{record.paymentdate || '-'}</td>
                                <td>{record.rental?.id || '-'}</td>
                                <td>
                                    <span className={`badge ${
                                        record.paymentstatus ==="PENDING"?'bg-warning':
                                        record.paymentstatus ==="SUCCESS"?'bg-success':'bg-danger'
                                    }`}>
                                        {record.paymentstatus}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-secondary me-2"
                                        onClick={() => navigate(`/paycheck/${record.rental?.id}`)}>
                                        Details
                                    </button>
                                    {record.paymentstatus === "PENDING" && record.lender!==null &&(
                                        <button className="btn btn-sm btn-success"
                                            onClick={() => handlePayNow(record.rental?.id)}>
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center">No records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Paychecks;
