import React, { useState } from "react";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitsignIn = () => {
    fetch("https://shrouded-refuge-87212.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          props.loadUser(user);
          props.onRouteChange("home");
        }
      });
  };

  return (
    <main className="authPage registerAuthPage">
      <h1 className="authPage__title">Register</h1>
      <input
        className="authPage__input"
        type="name"
        name="name"
        id="name"
        placeholder="Name"
        onChange={({ target }) => setName(target.value)}
      />
      <input
        className="authPage__input"
        type="email"
        name="email-address"
        id="email-address"
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <input
        className="authPage__input"
        type="phone"
        name="phone"
        id="phone"
        placeholder="Phone Number"
        onChange={({ target }) => setPhone(target.value)}
      />
      <input
        className="authPage__input"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button onClick={() => onSubmitsignIn()} className="authPage__button">
        Register
      </button>
      <p
        href="#0"
        onClick={() => props.onRouteChange("signIn")}
        className="authPage__link"
        style={{ zIndex: "99" }}
      >
        Already have an account? <span> Sign In?</span>
      </p>
    </main>
  );
};

export default Register;
