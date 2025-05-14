import { Link } from "react-router-dom";
import "../css/TempNav.css";

export function TempNav(){
    return(
        <>
            <div className = "navBar">
                <Link to = "/" className = "navButton"> Home Page </Link>
                <Link to = "/adminParking" className = "navButton"> AdminPage </Link>
                <Link to = "/user" className = "navButton"> UserPage </Link>
                <Link to = "/worker" className = "navButton"> WorkerPage </Link>
            </div>
        </>
    )
}