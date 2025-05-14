import { useEffect, useState } from "react";
import "../css/Header3.css";
import "../css/Footer.css";
import "../css/ScrollUp.css";
import "../css/AdminProfile.css";
import "../css/AdminParking.css";
import "../css/AdminAccounts.css";
import { Header3 } from "../components/Header3";
import { Footer } from "../components/Footer";
import { ScrollUp } from "../components/ScrollUp";
import { AdminProfile } from "../components/AdminProfile";
import { AdminParking } from "../components/AdminParking";
import { AdminAccounts } from "../components/AdminAccounts";
import { ParkingOverviewAdmin } from "../components/ParkingOverviewAdmin";

export function AdminPage() {
  const [setUserRole] = useState("");

  useEffect(() => {
    // Fetch session data (including the role)
    fetch("http://localhost:8080/api/session", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setUserRole(data.accountType))
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, );


}
