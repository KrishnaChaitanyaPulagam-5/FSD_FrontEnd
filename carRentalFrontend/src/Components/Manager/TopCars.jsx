import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function TopCars() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const GetTopCars = async () => {
            const res = await axios.get("http://localhost:8080/api/reservation/getTopCars");
            console.log(res.data);

            const data = {
                labels: res.data.cars,
                datasets: [
                    {
                        label: 'Bookings',
                        data: res.data.bookings,
                        backgroundColor: [
                            'rgba(192, 102, 12, 0.2)',
                            'rgba(19, 159, 159, 0.2)',
                            'rgba(14, 77, 120, 0.2)',
                            'rgba(76, 20, 186, 0.2)',
                            'rgba(154, 112, 15, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(255, 205, 86)'
                        ],
                        borderWidth: 1
                    }
                ]
            };

            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        };

        GetTopCars();
    }, []);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
