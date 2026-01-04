import notfoundImage from "../assets/404.png";

export function NotFoundPage() {
     return (
         <main>
             <img src={notfoundImage} alt="404" />
             <h1>404 Page Not Found</h1>
             <p>The page you are trying to view doesn't exist.</p>
         </main>
     )
}