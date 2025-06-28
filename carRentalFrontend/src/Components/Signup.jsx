import axios from "axios";
import { useState } from "react";
import "../CSS/Signup.scss"
import { useNavigate } from "react-router-dom";


function Signup(){
    let[Name,SetName]=useState("")
    let [email, setEmail] = useState("");
    let [address, setAddress] = useState("");
    let [driverLicense, setDriverLicense] = useState("");
    let [contactInfo, setContactInfo] = useState("");
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [msg,setmsg]=useState("");
    const navigate = useNavigate();

    const Sign=async()=>{
        try{
        await axios.post("http://localhost:8080/api/customer/add",{
            'name':Name,
            'email':email,
            'address':address,
            'driverlicense':driverLicense,
            'contactinfo':contactInfo,
            'created_time':new Date().toISOString().split("T")[0],
            user:{
            'username':username,
            'password':password,}
        })
        setmsg("Registered Successfully")
        navigate("/")
        }
        catch(err){
            setmsg("Registration Failed")
        }
        
    }

      return (
  <div className="signup-container">
    <div className="signup-card">
      <div className="card-header"><h2>Register New Customer</h2></div>
      <div className="card-body">

        <div className="mb-4">
          <label>Enter Customer Name:</label>
          <input type="text" required onChange={(e) => { SetName(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter Customer E-Mail:</label>
          <input type="text" required onChange={(e) => { setEmail(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter Customer Address:</label>
          <input type="text" required onChange={(e) => { setAddress(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter Customer Contact:</label>
          <input type="text" required onChange={(e) => { setContactInfo(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter Customer Driver License:</label>
          <input type="text" required onChange={(e) => { setDriverLicense(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter UserName :</label>
          <input type="text" required onChange={(e) => { setUsername(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter Password:</label>
          <input type="text" required onChange={(e) => { setPassword(e.target.value), setmsg("") }} />
        </div>
        <button onClick={Sign}>Register</button>
      </div>
      <div className="card-footer">{msg}</div>
    </div>
  </div>
);

}

export default Signup;