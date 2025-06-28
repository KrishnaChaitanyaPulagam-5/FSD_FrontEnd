import Login from "./Components/Login";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";
import CustomerHome from "./Components/Customer/CustomerHome";
import Rental from "./Components/Customer/Rental";
import Cars from "./Components/Customer/Cars";
import NewReservation from "./Components/Customer/NewReservation";
import BookingForm from "./Components/Customer/BookingForm";
import Stats from "./Components/Stats";
import Payment from "./Components/Customer/Payment";
import ManagerDashboard from "./Components/Manager/ManagerDashboard";
import ManagerDashBoard from "./Components/Manager/ManagerDashboard";
import ManagerHome from "./Components/Manager/ManagerHome";
import Car from "./Components/Manager/Car";
import EditCar from "./Components/Manager/EditCar";
import Reservation from "./Components/Manager/Reservations";
import Paychecks from "./Components/Manager/Paychecks";
import PaycheckDetails from "./Components/Manager/PaycheckDetails";
import Return from "./Components/Customer/Return";
import LenderDashboard from "./Components/Lender/LenderDashboard"
import LenderHome from "./Components/Lender/LenderHome"
import LenderCars from "./Components/Lender/Cars";
import AddCar from "./Components/Lender/AddCar";
import EditLenderCar from "./Components/Lender/EditLenderCar";
import CheckReservations from "./Components/Lender/Reservations";
import Payments from "./Components/Lender/Payments";
import AddCompanyCar from "./Components/Manager/AddCompanyCar";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/customerdashboard" element={<CustomerDashboard />}>
          <Route index element={<CustomerHome />} />
          <Route path="customerhome" element={<CustomerHome />} />
          <Route path="getreservations" element={<Rental />} />
          <Route path="searchCars" element={<Cars />} />
          <Route path="newReservation" element={<NewReservation />} />
          <Route path="book/:carId" element={<BookingForm />} />
          <Route path="returns" element={<Return/>}/>
        </Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/managerdashboard" element={<ManagerDashboard />}>
          <Route index element={<ManagerHome />} />
          <Route path="dashboard" element={<h2>Dashboard</h2>} />
          <Route path="cars" element={<Car />} />
          <Route path="reservations" element={<Reservation/>} />
          <Route path="payments" element={<Paychecks/>} />
        </Route>
        <Route path="/paycheck/:id" element={<PaycheckDetails />}></Route>
        <Route path="editcar" element={<EditCar />}></Route>
        <Route path="/addcompanycar" element={<AddCompanyCar/>}></Route>

        <Route path="/lenderdashboard" element={<LenderDashboard/>}>
        <Route index element={<LenderHome/>}/>
        <Route path="cars" element={<LenderCars/>}/>
        <Route path="reservations" element={<CheckReservations/>}/>
        <Route path="payments" element={<Payments/>}/>
       

        </Route>
         <Route path="/addcar" element={<AddCar/>}></Route>
         <Route path="/editlendercar/:id" element={<EditLenderCar/>}></Route>

      </Routes>
    </BrowserRouter>
    // <Stats/>
    // <Payment/>
    // <BrowserRouter>
    // <Routes>
    //   <Route
    //       path="/manager/*"
    //       element={
    //         <ManagerDashboard>
    //           <Routes>
    //             <Route path="dashboard" element={<h2>Dashboard</h2>} />
    //             <Route path="cars" element={<h2>Cars</h2>} />
    //             <Route path="reservations" element={<h2>Reservations</h2>} />
    //             <Route path="payments" element={<h2>Payments</h2>} />
    //           </Routes>
    //         </ManagerDashboard>
    //       }
    //     />
    // </Routes>
    // </BrowserRouter>
  );
}
export default App;