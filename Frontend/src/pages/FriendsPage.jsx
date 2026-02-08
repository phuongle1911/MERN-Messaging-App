import { FriendList } from "../components/FriendsList";
import "../styles/FriendsPage.css";
import React from "react";


{/* <FriendList /> */}


export function FriendsPage() {

  return (
    <main className="friends-main">
      <h1>Your Friends</h1>
      <FriendList />
    </main>
  );
}


