import { LogoutButton } from "../components/LogoutBttm";
import { describe, expect, test, vi } from "vitest";
import api from "../api";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";



const mockNavigate = vi.fn();


vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
  ...actual, 
  useNavigate: () => mockNavigate,
  };
});


global.alert = vi.fn();


vi.mock("../api", () => ({
  default: {
    post: vi.fn()
  }
}));


describe("Logout Button", () => {
  test(" Alert, Api and navigate when logout ", async () => {
    api.post.mockResolvedValue({
      data: { message:"Logout successfully" }
    });

    render(
      <MemoryRouter><LogoutButton/></MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /log out/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/users/logout", {});
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(alert).toHaveBeenCalledWith("logged out succesfully");
    });
  });


  
});
