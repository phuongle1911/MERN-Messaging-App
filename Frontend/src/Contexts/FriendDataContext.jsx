import { createContext, useEffect, useState } from "react";
import api from "../api";


export const FriendDataContext = createContext();

const fetchFriendList = async () => {
  try {
    const me = await api.get('/users/me');
    const meId = me.data._id;

    const connection = await api.get("/connection");

    const connectionList = connection?.data?.length > 0 ? connection.data : [];
    const connectionListSanitised = connectionList.map(connection => {
      const sanitisedConnection = connection.userId._id === meId ? connection.friendId : connection.userId;
      const connectionId = connection._id
    

      return {
        connectionId: connectionId,
        ...sanitisedConnection,
        connectionStatus: connection.connectionStatus,
      };
    });
    
    return Promise.resolve(connectionListSanitised);
  } catch(error) {
    console.log(error);
    Promise.resolve([]);
  }
}

export function FriendDataProvider({children}) {
  const [friends, setFriends] = useState([])
  

  useEffect(() => {
    fetchFriendList().then((data) => {
      setFriends(data);
    });
  }, []);
  


  
  return (
    <FriendDataContext.Provider value={{friends}}>
      {children}
    </FriendDataContext.Provider>
  );


  
}