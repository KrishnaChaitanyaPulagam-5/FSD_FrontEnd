import axios from "axios";
import { useEffect, useState } from "react";
import "../../CSS/Car.scss"

function Cars(){
let[cars,setCars]=useState([])
let[keyword,setKeyword]=useState('')

const searchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/car/searchByKeyword/" + keyword);
    //   console.log(response.data);
    
      setCars(response.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };
    return (
    <div className="container-fluid">
      <div className="row mt-5 mb-4">
        <div className="col-lg-12 d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-25 me-2"
            placeholder="Search cars..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={searchCars}>Search</button>
        </div>
      </div>

      <div className="row">
        {cars.map((c, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card custom-car-card">
              
              <img
                src={`/images/${encodeURIComponent(c.image || "default-car.png")}`}
                alt={`${c.brand} ${c.model}`}
                className="card-img-top car-image"
              />

              <div className="card-body">
                <h5 className="card-title">{c.brand} {c.model}</h5>
                <p className="card-text">Category: {c.category}</p>
                <p className="card-text">Year: {c.year}</p>
                <p className="card-text">Status: {c.status}</p>
                <p className="card-text">Price: ₹{c.dailyrate} / day</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cars;