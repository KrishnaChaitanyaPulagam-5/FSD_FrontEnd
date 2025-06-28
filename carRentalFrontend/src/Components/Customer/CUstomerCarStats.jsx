
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function CUstomerCarStats() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        const GetTop5Cars = async () => {
            const res = await axios.get("http://localhost:8080/api/reservation/getTopCarsForCustomer", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            })
            console.log(res.data);
            const documentStyle = getComputedStyle(document.documentElement);
            const data = {
                labels: res.data.cars,
                datasets: [
                    {
                        data: res.data.reservations,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--blue-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--green-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--blue-400'),
                            documentStyle.getPropertyValue('--yellow-400'),
                            documentStyle.getPropertyValue('--green-400')
                        ]
                    }
                ]
            };
            const options = {
                cutout: '60%',
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            boxWidth: 20,
                            padding: 20
                        },
                        maxHeight: 100
                    }
                },
                layout: {
                    padding: {
                        bottom: 30
                    }
                }
            };


            setChartData(data);
            setChartOptions(options);
        }
        GetTop5Cars();
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} style={{ width: '500px', height: '500px' }} />
        </div>
    )
}
