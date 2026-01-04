import "../styles/Message.css";


export default function Message({ message }) {
    
       
    return(
        <div className="message-box">
            <div className="user-box">
                <div className="small-circle">
                    {
                    message?.profilePic !== "" && <img src={`http://localhost:3000/uploads/${message.profilePic}`} />
                    }
                </div>
                <div className="username">
                    {message.username}
                </div>
            </div>
            <div className="message">
                {message.content}
            </div>
        </div>
    )
}