import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";
import { LogoutButton } from "../components/LogoutBttm";

// this layout changes depending on devices
// this is layout for phone and tablet
export function BaseLayout() {
  return <>
    <header>
      <h1>BlahBlah!</h1>
      <NavBar />
      
    </header>


    <Outlet />
  </>
}