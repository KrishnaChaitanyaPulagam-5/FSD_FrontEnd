import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import "../../CSS/Manager/Reservation.scss";

export default function ReservationTable() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/reservation/getall", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            console.log(response.data)
            setReservations(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch reservations:", err);
        }
    };

    const carImageTemplate = (rowData) => (
        <img
            src={`/images/${rowData.car?.image || "default-car.jpg"}`}
            alt="Car"
            style={{ width: '100px', borderRadius: '8px' }}
        />
    );

    return (
        <div className="card">
            <h5 className="mb-3">Reservation List</h5>
            <DataTable
                value={reservations}
                paginator
                showGridlines
                rows={10}
                loading={loading}
                dataKey="id"
                emptyMessage="No reservations found."
            >
                <Column field="id" header="ID" />
                <Column field="customer.name" header="Customer Name" />
                <Column field="startdate" header="Start Date" />
                <Column field="enddate" header="End Date" />
                <Column field="car.dailyrate" header="Amount" />
                <Column field="status" header="Status" />
                <Column header="Car" body={(e) =>{return `${e.car.brand} ${e.car.model}`}}/>

                <Column header="Car Image" body={carImageTemplate} />
            </DataTable>
        </div>
    );
}
