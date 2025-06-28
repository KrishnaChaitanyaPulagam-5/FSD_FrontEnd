import axios from "axios";
import { useEffect, useState } from "react";

function ManagerHome() {
    let [name, setname] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name)
            setname(name);
    })
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2>welcome back {name}.</h2><br />
                            <h3></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManagerHome;