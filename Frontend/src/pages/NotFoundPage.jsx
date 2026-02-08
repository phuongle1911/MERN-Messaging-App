import notfoundImage from "../assets/404.png";
import React from "react";


export function NotFoundPage() {
     return (
       <main>
         <img src={notfoundImage} alt="404" />
         <h1>404 Page Not Found</h1>
         <p>The page you are trying to view does not exist.</p>
       </main>
     )
}