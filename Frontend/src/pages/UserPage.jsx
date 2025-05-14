import React, { useState, useEffect } from "react";
import { Header2 } from "../components/Header2";
import { ParkingZones } from "../components/ParkingZones";
import { Footer } from "../components/Footer";
import { ScrollUp } from "../components/ScrollUp";
import { LogoutButton } from "../components/Logoutbutton";
import UserProfile from '../components/UserProfile';

export function UserPage() {
  const [userRole, setUserRole] = useState({});
  const [activeTab, setActiveTab] = useState("parking");

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        window.location.href = "/";
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("Error logging out");
      console.error(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/session", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Session data:", data);
        setUserRole({ name: data.name, accountType: data.accountType, email: data.email });
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  }, []);

  return (
    <>
      <Header2 />
      <div className="Usernamepage">
        <h2>Welcome, {userRole.name}</h2>
        <p>{userRole.accountType}</p>

        <div>
          <LogoutButton onLogoutClick={handleLogout} />
        </div>

        {/* Tab Buttons */}
        <div className="tab-buttons" style={{ marginTop: "20px" }}>
          <button onClick={() => setActiveTab("parking")} className={activeTab === "parking" ? "active-tab" : ""}>
            Parking Zones
          </button>
          <button onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active-tab" : ""}>
            Account Settings
          </button>
        </div>

        {/* Content Section */}
        <div style={{ marginTop: "30px" }}>
          {activeTab === "parking" && <ParkingZones />}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>

      <ScrollUp />
      <Footer />
    </>
  );
}
