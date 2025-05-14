import "./assets/MainParkingHub.css";
import { useState } from "react";
import areaImage from './assets/Area-sample.jpg';

export function MainGrid() {
  const initialAreas = [
    {
      id: "Gate 1",
      image: areaImage,
      slots: [
        { id: "A1", occupied: false },
        { id: "A2", occupied: true },
        { id: "A3", occupied: false },
      ],
    },
    {
      id: "Gate 2",
      image: areaImage,
      slots: [
        { id: "B1", occupied: true },
        { id: "B2", occupied: false },
      ],
    },
    {
      id: "Gate 3",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    {
      id: "Gate 4",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    {
      id: "Gate 5",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    {
      id: "Ayunta",
      image: areaImage,
      slots: [
        { id: "C1", occupied: true },
        { id: "C2", occupied: true },
        { id: "C3", occupied: false },
      ],
    },
    
   
  ];

  const [areas] = useState(initialAreas);

  return (
    <div className="main-grid">
      <h1>Parking Spots</h1>
      <h3>Pick a spot!</h3>

      <div className="parking-area-grid-3x3">
        {areas.map((area, index) => {
          const available = area.slots.filter((s) => !s.occupied).length;
          const occupied = area.slots.filter((s) => s.occupied).length;

          return (
            <div key={index} className="parking-area">
              <img className="area-image" src={area.image} alt={area.id} />
              <h3 className="area-name">{area.id}</h3>
              <div className="slot-summary">
                <div>Available spots: {available}</div>
                <div>Occupied spots: {occupied}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}