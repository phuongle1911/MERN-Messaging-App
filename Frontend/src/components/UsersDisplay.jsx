import { useState } from "react"
import api from "../api"

export function UserDisplay({ username, userId, isConnected }) {

  const [buttonText, setButtonText] = useState("Connect")
  const [isDisable, setIsDisable] = useState(false)
  
  const createConnection = async () => {
    await api.post("/connection", {
      friendId: userId,
      connectionStatus: "PENDING"
    }).then((response) => {
      if (!response.data.error) {
        alert("Request sent!");
      }
    })
  };

  const handleClick = () => {
    setButtonText("Connected");
    setIsDisable(true);
  };

  return(
    <div className="user-row">
      <span className="user-name">
        <p>{username}</p>
        
      </span>
    {(isConnected === false) && <button className="connected" onClick={() => {createConnection(); handleClick()}} disabled={isDisable}>{buttonText}</button>}
    {(isConnected === true) && <p>Connected</p>}

    </div>

  )
}