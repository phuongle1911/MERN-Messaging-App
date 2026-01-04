import { createContext, useEffect, useState } from "react";
import api from "../api";

export const RoomDataContext = createContext();

const fetchRoomList = async () => {
  try {
    const response = await api.get("/rooms");
    
    console.log(response.data);

    return response.data; 
  } catch (error) {
    console.error(error);
    return [];
  }
};

export function RoomDataProvider({ children }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRoomList().then((data) => {
        setRooms(data)
    });
  }, []);

  return (
    <RoomDataContext.Provider value={{ rooms }}>
      {children}
    </RoomDataContext.Provider>
  );
}