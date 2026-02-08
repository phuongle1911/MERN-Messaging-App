import { useContext } from 'react';
import { FriendUser } from "./FriendUser"
import { FriendDataContext } from "../Contexts/FriendDataContext";
import React from 'react';

export function FriendList() {
  const friendsContext = useContext(FriendDataContext);
  const friends = friendsContext?.friends || [];

  if (friends?.length === 0) return <p>Sorry, your friends list looks empty</p>;

  return (
    <section className='friends-list'>
      {
        friends.map(friend => (
          // eslint-disable-next-line react/jsx-key
          <FriendUser friend={friend} />
        ))
      }
    </section>
  );

}