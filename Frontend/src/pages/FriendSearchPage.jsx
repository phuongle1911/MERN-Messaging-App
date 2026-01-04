import { useContext, useEffect, useState } from "react"
import api from "../api"
import { UserDisplay } from "../components/UsersDisplay";
import { FriendDataContext } from "../Contexts/FriendDataContext";
import '../styles/FriendsSearchPage.css';

export default function FriendSearchPage() {
  const [allOtherUsers,setAllOtherUsers] = useState([]);
  const [friendIdArray, setFriendIdArray] = useState([]);

  useEffect(() => {
    api.get("/users").then((response) => {
      let data = response.data;
      setAllOtherUsers(data)
    })
  },[]);


  const { friends } = useContext(FriendDataContext)
  let array = [];
  useEffect(() => {
    friends.map((friend) => {
      array.push(friend._id)
    });
    setFriendIdArray(array)
  }, [friends])



  return (
    <main className="main-search">
      <div className="search-friends">
      <h1>Connect with New Friends</h1>
      {/* <input type="text" /> */}
      <section>
        {allOtherUsers.map((user) => 
          <UserDisplay key={user.userId} username={user.username} userId={user.userId} isConnected={friendIdArray.includes(user.userId)} />
        )}
      </section>
      </div>
    </main>
  )
}