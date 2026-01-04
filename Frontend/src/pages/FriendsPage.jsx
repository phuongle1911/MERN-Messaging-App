import api from "../api" 
import { useState, useEffect, useContext } from "react";
import { FriendList } from "../components/FriendsList";
import "../styles/FriendsPage.css";

{/* <FriendList /> */}


export function FriendsPage() {

    return (
    <main className="friends-main">
      <h1>Your Friends</h1>
      <FriendList />
    </main>
  );
}


