import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
        

export default function UserJoiningRoom({ socket, roomChatId }) {
    
    const navigate = useNavigate();
    useEffect(() => {
        //Try to connect and join the room
        const onConnect =(() => {
            socket.emit("joinRoom", roomChatId);
        });
        
        socket.on("connect", onConnect);

        const handleForceDisconnect = ((reason) =>{
            //If we are disconnected, send the user back to the homepage (or an error page)
            //Can send the reason in the future as well
            alert(reason);
            navigate("/404");
        })

        socket.on("forceDisconnect", handleForceDisconnect);

        return () => {
            socket.off("connect", onConnect);
            
            socket.off("forceDisconnect", handleForceDisconnect);
        };  
    },[socket, roomChatId])

    return (
        <div></div>
    );
}