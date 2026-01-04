import { useState } from "react";
import { FriendOptionsMenu } from "./FriendsOptionsMenu";

export function FriendUser({ friend }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="friend-row">
      <span className="friend-name">
        {friend.username}
      </span>
      <span>
        {friend.connectionStatus.toUpperCase()}
      </span>
      <button className="friend-options" onClick={() => setOpen(!open)}>
        Options
      </button>

      {open && (
        <FriendOptionsMenu
          friend={friend}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};
