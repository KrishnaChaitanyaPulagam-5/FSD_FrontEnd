import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Return(){
    let[returns,setReturns]=useState([]);
    const navigate=useNavigate();
    let[latefees,setLatefees]=useState(undefined);

    useEffect(()=>{
    const GetAllReturns=async()=>{
    const res=await axios.get("http://localhost:8080/api/rental/getByLoginBooked",
        {headers : {Authorization : "Bearer "+localStorage.getItem("token")}}
    )
    console.log(res.data);
    setReturns(res.data);
    setLatefees(res.data.latefees);
    }
    GetAllReturns();
    },[])

    const ReturnCar=async(rentalId)=>{
        const res=await axios.put(`http://localhost:8080/api/return/process/${rentalId}`,{},
            {headers: {Authorization : "Bearer "+localStorage.getItem("token")}}
        )
        localStorage.setItem("rentalId",rentalId);
        console.log(res.data);
        if(res.data.latefees==0){
            navigate("/customerdashboard")
        }else{
            navigate("/payment")
        }
    }

    const returnBodyTemplate=(rowData)=>{
        return(
            <div className="flex gap-2">
                <button className="p-button p-button-sm p-button-warning" onClick={()=>{ReturnCar(rowData.id)}}>Return</button>
            </div>
        )
    
    }

    return(
        <div>
            <div className="card">
                <DataTable value={returns} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="reservation.customer.name" header="Name" style={{ width: '15%' }}></Column>
                    <Column field="start_date" header="Start Date" style={{ width: '15%' }}></Column>
                    <Column field="end_date" header="End Date" style={{ width: '15%' }}></Column>
                    <Column field="rentalcost" header="Rental Cost" style={{ width: '15%' }}></Column>
                    <Column field="reservation.car.brand" header="Car" style={{ width: '15%' }}></Column>
                    <Column header="Return" body={returnBodyTemplate} style={{ width: '15%' }}></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default Return;