import Message from "./Message";
import React, { useEffect, useState } from "react";

export default function RoomMessages({ socket }) {

    const [loadedMessages, setLoadedMessages] = useState([]);

    const DEFAULT_IMAGES = [
        '/defaults/bored.png',
        '/defaults/glee.png',
        '/defaults/look.png',
        '/defaults/neutral.png',
        '/defaults/smile.png',
        '/defaults/speed.png',
    ];

    const getRandomProfile = () => {
        return DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
    };


    useEffect(() => { 
        const handleRoomMessage = (msg) => {

            if (msg.profilePic == null){
                msg.profilePic = getRandomProfile();
            }

            console.log(msg)
            
            setLoadedMessages(prevMessages => [...prevMessages, msg]);

        };

        socket.on("roomMessage", handleRoomMessage); 

        const handleRestore = ((messageHistory) => {
            messageHistory.forEach(msg => {
                handleRoomMessage(msg)
            });
        });
        //Restore chat history after joining room
        socket.on('restoreChatHistory', handleRestore);


        //Unmount the socket listen here
        return () => { 
            socket.off("roomMessage",handleRoomMessage); 
            socket.off("restoreChatHistory", handleRestore);
        };
    }, [socket]); //retrigger whenever socket changes (to remount the listeners)

    return (
        <div className="message-container"> 
            {loadedMessages.map((msg, index)=>(
                <Message key={index} message={msg}/>
            ))}
            
        </div>
    );
}