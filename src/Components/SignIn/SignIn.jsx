import React, { useState } from "react";

const SignIn = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const saveAuthTokenInSession = (token) => {
    window.localStorage.setItem("token", token);
  };

  const onSubmitSignIn = () => {
    fetch("https://shrouded-refuge-87212.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success === "true") {
          saveAuthTokenInSession(data.token);
          loadUser(data.user);
          onRouteChange("home");
        }
      })
      .catch(console.log);
  };

  return (
    <main className="authPage">
      <h1 className="authPage__title">Sign In</h1>
      <input
        className="authPage__input"
        type="email"
        name="email-address"
        id="email-address"
        placeholder="Email"
        onChange={({ target }) => setSignInEmail(target.value)}
      />
      <input
        className="authPage__input"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={({ target }) => setSignInPassword(target.value)}
      />
      <button onClick={() => onSubmitSignIn()} className="authPage__button">
        Sign In
      </button>
      <p
        href="#0"
        className="authPage__link"
        onClick={() => onRouteChange("register")}
      >
        Don't have an account? <span>Register</span>
      </p>
    </main>
  );
};

export default SignIn;
