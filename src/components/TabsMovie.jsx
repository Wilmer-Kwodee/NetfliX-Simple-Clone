import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import axios from "axios";

const TabsMovie = ({ movieData }) => {
  const [activeTab, setActiveTab] = useState("Normal");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7161/api/info/rooms/${movieData.imdbID}/${activeTab}`
        );
        
        console.log("Room Response: ", response);
        const data = response.data;
        
        console.log("Room tes: ", data);
        console.log("Room Data: ", data[0].room_ID);

        setRooms(data);

        console.log("Room: ", rooms[0].room_ID);

        setLoading(false);
      } 
      catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    fetchRoom();
  }, [movieData.imdbID, activeTab]);

  console.log("Rooms: ", rooms);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setRooms([]);
  };

  return (
    <div className="container p-5">
      <div className="d-flex justify-content-center">
        <button
          className={` btn d-flex align-items-center rounded justify-content-center text-white flex-grow-1 ${
            activeTab === "Normal" ? "bg-warning " : ""
          }`}
          onClick={() => handleTabClick("Normal")}
        >
          BIASA
        </button>
        <button
          className={` btn d-flex align-items-center rounded justify-content-center text-white flex-grow-1 ${
            activeTab === "Premium" ? "bg-warning " : ""
          }`}
          onClick={() => handleTabClick("Premium")}
        >
          PREMIERE
        </button>
      </div>

      <div className="mt-5">
        <div className={`text ${activeTab === "Normal" ? "block" : "d-none"}`}>
          <h2>BIASA</h2>
          <hr className="p-3" />
          {loading ? (
            <p>Loading...</p>
          ) : rooms.length > 0 ? (
            <div className="d-flex flex-wrap gap-5">
              {rooms.map((room) => (
                <PopUp
                  roomNumber={room.room_ID}
                  movieData={movieData}
                  params={room.room_SeatCapacity}
                />
              ))}
            </div>
          ) : (
            <p>No rooms available.</p>
          )}
        </div>

        <div className={`text ${activeTab === "Premium" ? "block" : "d-none"}`}>
          <h2>PREMIERE</h2>
          <hr className="p-3" />
          {loading ? (
            <p>Loading...</p>
          ) : rooms.length > 0 ? (
            <div className="d-flex flex-wrap gap-5">
              {rooms.map((room) => (
                <PopUp
                  roomNumber={room.room_ID}
                  movieData={movieData}
                  params={room.room_SeatCapacity}
                />
              ))}
            </div>
          ) : (
            <p>No rooms available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsMovie;