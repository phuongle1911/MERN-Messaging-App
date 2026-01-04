import { useContext, useState } from 'react';
import { RoomDataContext } from "../Contexts/RoomDataContext";
import { useNavigate } from "react-router-dom";

export function RoomList() {
  const roomsContext = useContext(RoomDataContext);
  
  const rooms = roomsContext?.rooms || [];
  const navigate = useNavigate();
  
  const onSubmit = (_id) =>{
    navigate(`/rooms/${_id}`);
  }
  
  
  if (rooms?.length === 0) return <p>Sorry, you arent in any groups</p>;

  return (
    <section className='rooms-list'>
      {
        rooms.map(room => (
          <div>
            <p key={room._id}> { room.name }</p>
            <button onClick={() => onSubmit(room._id)}>Go to room</button>
          </div>
        ))
      }
    </section>
  );

}