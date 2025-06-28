import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

function BookingStats() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [bookings,setBookings]=useState([]);
  const [totalBookings,setTotalBookings]=useState(0);

  useEffect(() => {
    const carstats = async () => {
      const response = await axios.get("http://localhost:8080/api/reservation/getCarStats");
      const documentStyle = getComputedStyle(document.documentElement);
      console.log(response.data)
      setBookings(response.data);
      let count=0;
      response.data.bookings.map((b)=>(b? count+=b: 0 ))
      setTotalBookings(count);

      setChartData({
        labels: response.data.cars,
        datasets: [
          {
            data: response.data.bookings,
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
      });
      

      setChartOptions({
        cutout: '60%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      });
    };

    carstats();
  }, []);

  return (
    <div className='card'>
      <div className="chart-wrapper">
      <Chart type="doughnut" data={chartData} options={chartOptions} className="large-doughnut" />
    </div>
    <div>
      <label>Total Bookings</label>
      {totalBookings}
    </div>
    </div>
    

  );
}

export default BookingStats;
