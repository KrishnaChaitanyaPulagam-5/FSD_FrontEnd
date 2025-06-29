import axios from "axios";
import { Badge } from "primereact/badge";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
// import "../../CSS/Lender/Payments.scss"

function Payments() {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        GetPayChecksForLender();
    }, [])


    const GetPayChecksForLender = async () => {
        const res = await axios.get("http://localhost:8080/api/paycheck/getByLender",
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        console.log(res.data);
        setPayments(res.data);
    }
    let totalSuccess = 0;
    let totalPending = 0;

    payments.map(p => {
        p.paymentstatus==='SUCCESS'?totalSuccess+=p.amount:p.paymentstatus=='PENDING'?totalPending+=p.amount:0
    });
    let ID = 1;
    return (
        <div className="card">
            <DataTable value={payments} tableStyle={{ minWidth: '40rem' }}>
                <Column header="ID" body={() => { return ID++ }} />
                <Column header="Car" body={(e) => `${e.car.brand} ${e.car.model}`} />
                <Column header="Start Date" body={(e) => e.rental.start_date} />
                <Column header="End Date" body={(e) => e.rental.end_date} />
                <Column header="Location" body={(e) => e.rental.branch_dropoff.location} />
                <Column field="amount" header="Amount" />
                <Column
                    header="Status"
                    body={(e) => (
                        <Badge
                            value={e.paymentstatus}
                            severity={e.paymentstatus === 'SUCCESS' ? 'success' : e.paymentstatus === 'PENDING' ? 'warning' : 'danger'} />
                    )} />

            </DataTable>
            <div style={{ display: "flex", justifyContent: "space-evenly", padding: "1rem", fontWeight: "bold" }}>
                <span>Total Paid: {totalSuccess}</span>
                <span>Yet to Pay: {totalPending}</span>
            </div>

        </div>
    );
}
export default Payments;