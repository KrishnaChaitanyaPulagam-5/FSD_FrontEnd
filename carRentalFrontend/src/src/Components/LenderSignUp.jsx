import axios from "axios";
import { useState } from "react";
import "../CSS/Signup.scss"
import { useNavigate } from "react-router-dom";


function LenderSignup(){
    let[Name,SetName]=useState("")
    let [email, setEmail] = useState("");
    let [address, setAddress] = useState("");
    let [contactInfo, setContactInfo] = useState("");
    let [password, setPassword] = useState("");
    let [msg,setmsg]=useState("");
    let [accnumber,setAccNumber]=useState("");
    let [amount,setAmount]=useState(0);
    const navigate = useNavigate();

    const Sign=async()=>{
        if (amount < 500) {
        setmsg("Minimum Caution deposit should be ₹500");
        alert("Minimum Caution deposit should be ₹500");
        return;
    }
        try{
        await axios.post("http://localhost:8080/api/lender/add",{
            'name':Name,
            'email':email,
            'address':address,
            'contactinfo':contactInfo,
            'created_time':new Date().toISOString().split("T")[0],
            user:{
            'username':email,
            'password':password,},
            customerAccount:{
              "accountNumber":accnumber,
              "amount":amount
            },
            'status':"ACTIVE"
        })
        setmsg("Registered Successfully");
        alert("Registered Succesfully");
        navigate("/login")
        }
        catch(err){
          setmsg("Registration Failed");
          alert("Registered Failed");
          
        }
        
    }

      return (
  <div className="signup-container">
    <div className="signup-card">
      <div className="card-header"><h2>Register New Lender</h2></div>
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
          <label>Enter UserName :</label>
          <input type="text" required value={email} readOnly />
        </div>
        <div className="mb-4">
          <label>Enter Password:</label>
          <input type="text" required onChange={(e) => { setPassword(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter AccountNumber:</label>
          <input type="text" required onChange={(e) => { setAccNumber(e.target.value), setmsg("") }} />
        </div>
        <div className="mb-4">
          <label>Enter Amount to deposit:</label>
          <input type="number" required onChange={(e) => { setAmount(e.target.value), setmsg("") }} />
        </div>

        <button onClick={Sign}>Register</button>
      </div>
      <div className="card-footer">{msg}</div>
    </div>
  </div>
);

}

export default LenderSignup;