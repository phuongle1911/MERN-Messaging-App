import { useState } from "react";
import UserLogInForm from "../components/UserLogInForm";
import "../styles/LogInPage.css"

export default function LogInPage() {

  const [error, setError] = useState("");


  return (
    <main className="login-page">
      <section className="SignInForm">
      <h1>Sign in</h1>

      {error && (
        // <p style={{ color: "red", marginBottom: "15px" }}>
        <p className="error">
          {error}
        </p>
      )}

      <UserLogInForm setError={setError}/>
      </section>
    </main>
  );
}