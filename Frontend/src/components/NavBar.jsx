import { useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import { LogoutButton } from "./LogoutBttm";



export function NavBar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false)

  const hideOnRoutes = [ "/", "/users/login", "/users/register"]; 
  if (hideOnRoutes.includes(loc.pathname)) {return null};

  return (
    <div className="drop-container">
      <button className="drop-button"
      onClick={() => setOpen (!open)}>
        ☰
      </button>
    <nav className={`drop-menu ${open ? "open" : ""}`}>
      <NavLink to="/home" onClick={() => setOpen(false)}>Home</NavLink>
      <NavLink to="/profiles" onClick={() => setOpen(false)}>Profile</NavLink> 
      <NavLink to="/friends/search" onClick={() => setOpen(false)}>Search</NavLink>
      <NavLink to="/friends" end onClick={() => setOpen(false)}>Friends</NavLink>
      <LogoutButton />
    </nav>
    </div>
  );
}
