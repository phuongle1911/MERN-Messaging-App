import { FriendList } from "../components/FriendsList";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import { FriendDataContext } from "../Contexts/FriendDataContext";

vi.mock("../components/FriendList", () => ({
  FriendUser: ({ friend }) => (
    <div data-testid="friend-user">{friend.name}</div>
  )
}));

describe("FriendList", () => {
  test("Show message if it's empty", () => {
    render(<FriendDataContext.Provider value={[]}><FriendList /></FriendDataContext.Provider>);
    expect(screen.getByText('Sorry, your friends list looks empty')).toBeInTheDocument();
  });
});

