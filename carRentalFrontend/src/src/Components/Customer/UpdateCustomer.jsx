import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/UpdateCustomer.scss"

function UpdateCustomer() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contactinfo, setContactInfo] = useState("");
    const [driverlicense, setDriverLicense] = useState("");
    const [amount, setAmount] = useState(0);
    const [msg, setMsg] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/customer/getByLogin", {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                });
                const data = res.data;
                setName(data.name);
                setAddress(data.address);
                setContactInfo(data.contactinfo);
                setDriverLicense(data.driverlicense);
            } catch (err) {
                console.error("Failed to load customer", err);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:8080/api/customer/updateByLogin", {
                name,
                address,
                contactinfo,
                driverlicense,
                customerAccount: { amount: amount }
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            setMsg("Details updated successfully");
            navigate("/customerdashboard")
        } catch (err) {
            setMsg("Failed to update");
        }
    };

    const handleImageUpload = async () => {
        if (!file) {
            setMsg("Please choose an image file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:8080/api/customer/upload/profile_pic", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });
            setMsg("Profile image uploaded");
            navigate("/cutomerdashboard")
        } catch (err) {
            setMsg("Failed to upload image");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Update Your Profile</h2>

            <div className="mb-3">
                <label>Name:</label>
                <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>Address:</label>
                <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>Contact Info:</label>
                <input className="form-control" value={contactinfo} onChange={(e) => setContactInfo(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>Driver License:</label>
                <input className="form-control" value={driverlicense} onChange={(e) => setDriverLicense(e.target.value)} />
            </div>
            <div className="mb-3">
                <label>Deposit More:</label>
                <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <button className="btn btn-primary me-2 mb-3" onClick={handleUpdate}>Update Details</button>

            <div className="mb-3">
                <label>Upload Profile Picture:</label>
                <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <button className="btn btn-secondary" onClick={handleImageUpload}>Upload Image</button>

            <div className="mt-3">{msg}</div>
        </div>
    );
}

export default UpdateCustomer;
