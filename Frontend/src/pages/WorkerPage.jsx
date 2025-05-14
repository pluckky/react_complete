import { useEffect, useState } from "react";
import "../css/Header2.css";
import "../css/Footer.css";
import "../css/ScrollUp.css";
import { Header2 } from "../components/Header2";
import { ParkingZones } from "../components/ParkingZones";
import { Footer } from "../components/Footer";
import { ScrollUp } from "../components/ScrollUp";

export function WorkerPage() {
  const [userRole, setUserRole] = useState({});

  useEffect(() => {
    // Fetch session data (including the role)
    fetch("http://localhost:8080/api/session", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Session data:", data);
        setUserRole({name: data.name, accountType: data.accountType})})
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
      
  }, []);
    
  return (
    <>
      <Header2 />
      <div className="Workernamepage">
        <h2>Welcome, {userRole.name}</h2>
          <p>{userRole.accountType}</p>
        <ParkingZones />
      </div>
      <ScrollUp />
      <Footer />
    </>
  );
}

