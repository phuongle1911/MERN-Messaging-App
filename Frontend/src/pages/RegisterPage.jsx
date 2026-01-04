import { useState } from "react";
import UserRegisterForm from "../components/UserRegisterForm";
import "../styles/LogInPage.css"

export default function Register() {

  const [error, setError] = useState("");

  return (
    <main className="login-page">
      <section className="SignInForm">
      <h1>Register user</h1>

      {error && (
        <p className="error" style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <UserRegisterForm setError={setError}/>
      </section>
    </main>
  );
}