import "../css/AdminParking.css";
import { useGetFetch } from "../customHooks/useGetFetch";
import { useState, useEffect } from "react";
import { AdminParkingTableContent } from "./AdminParkingTableContent";

export function AdminParking() {
  // dynamic changes pa lang to, wala pang editing (ikaw na'to matti)
  const [selectedZone, setSelectedZone] = useState("A");


  // const [selectedZone, setSelectedZone] = useState("A");
  const [show, setShow] = useState("showAll")
  const [refreshKey, setRefreshKey] = useState(0);
  
      const handleRefresh = () => {
          setRefreshKey(prevKey => prevKey + 1);
      }
  
      const {data: lots, isPending, error, triggerGet} = useGetFetch();
      
      useEffect(()=> {
          triggerGet(`http://localhost:8080/parkingOverviewAdmin/${selectedZone}`)
      }, [selectedZone, refreshKey])
      
      // Use these variables for the Parking Status
      const numAvailable = lots.filter((lot) => lot.parking_status === "vacant").length
      const numOccupied = lots.filter((lot) => lot.parking_status === "occupied").length

  return (
    <>
      {/* TOP CONTENT */}
      <section className="parkingOverview section" id="parkingOverview">
        <div className="parkingOverview__container">
          <div className="parkingOverview__content">
            <h1 className="parkingOverview__title">Parking Overview</h1>
            <p className="description">
              View the real-time summary of of all parking spots accross
              different locations in DLSU-D.
            </p>
          </div>
        </div>
      </section>
      {/* TABLES */}
      <section className="parkingLayout">
        <div className="parkingLayout__container">
          <div className="locationTable__container">
            <div className="locationTable__content">
              <h1 className="locationTable__title">Parking Spots</h1>
              <p className="locationTable__divider">Gate 1</p>
              {/* BUTTONS */}
              <button
                className={`locationButton ${
                  selectedZone === "A" ? "active" : ""
                }`}
                onClick={() => setSelectedZone("A")}
              >
                Ayuntamiento
              </button>
              <button
                className={`locationButton ${
                  selectedZone === "B" ? "active" : ""
                }`}
                onClick={() => setSelectedZone("B")}
              >
                ICTC Building
              </button>
              <button
                className={`locationButton ${
                  selectedZone === "C" ? "active" : ""
                }`}
                onClick={() => setSelectedZone("C")}
              >
                Parking Name
              </button>
            </div>
          </div>

          <div className="parkingTable__container">
            <div className="parkingTable__content">
              <h1 className="parkingTable__title">Parking Spots</h1>
              <p>NOTE | Show toggle: Show All, Student, Worker</p>
              <p>NOTE | Shows capacity on right side</p>

              <br/><br/><br/>
              <p>Available Spots: {numAvailable}</p>
              <p>Occupied Spots: {numOccupied}</p>
              <br/><br/><br/>
  
              {<button type="button" onClick = {() => setShow("showAll")}> Show All </button>}
              {<button type="button" onClick = {() => setShow("student")}> Student </button>}
              {<button type="button" onClick = {() => setShow("worker")}> Worker </button>}
  
              <br/><br/>
              <table className="parkingTable">
                  <thead>
                      <tr>
                          <th>Spot</th>
                          <th>Car Plate</th>
                          <th>ID Number</th>
                          <th>Account Type</th>
                          <th>Vehicle Type</th>
                          <th>Time In</th>
                          <th>Time Date</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                  {isPending && <tr><td>Loading...</td></tr>}
                  {error && <tr><td>{error.message}</td></tr>}
                  {lots && 
                      lots.map((lot, index)=>{
                          return(
                              <AdminParkingTableContent {...lot} key={index} visible = {show} onRefresh={handleRefresh}  />
                          )
                      })
                  }
                  </tbody>
              </table>


              {/* {selectedZone === "A" ? (
                <table className="parkingTable">
                  <thead>
                    <tr>
                      <th>ID Number</th>
                      <th>Spot</th>
                      <th>Name</th>
                      <th>Vehicle</th>
                      <th>Time-In</th>
                      <th>Time-Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>202330324</td>
                      <td>A15</td>
                      <td>Janny Cake</td>
                      <td>Car</td>
                      <td>1:00PM</td>
                      <td>3:00PM</td>
                      <td>Occupied</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="parkingTable">
                  <thead>
                    <tr>
                      <th>ID Number</th>
                      <th>Spot</th>
                      <th>Name</th>
                      <th>Vehicle</th>
                      <th>Time-In</th>
                      <th>Time-Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>202330444</td>
                      <td>A1</td>
                      <td>Matii Cake</td>
                      <td>Car</td>
                      <td>1:00PM</td>
                      <td>4:00PM</td>
                      <td>Occupied</td>
                    </tr>
                  </tbody>
                </table>
              )} */}


            </div>
          </div>
        </div>
      </section>
    </>
  );
}
