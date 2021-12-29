import React, { useState } from "react";
import "./SignIn.css";

const SignIn = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const saveAuthTokenInSession = (token) => {
    window.localStorage.setItem("token", token);
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
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
          // fetch(`http://localhost:3000/profile/${data.userId}`, {
          //   method: "get",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: data.token,
          //   },
          // })
          //   .then((resp) => resp.json())
          //   .then((user) => {
          //     if (user && user.email) {
          //       loadUser(user);
          //       onRouteChange("home");
          //     }
          //   })
          //   .catch(console.log);
        }
      })
      .catch(console.log);
  };

  // onSubmitsignIn = () => {
  //     fetch('https://calm-tundra-76384.herokuapp.com/signIn', {
  //         method: 'post',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({
  //         email: this.state.signInEmail,
  //         password: this.state.signInPassword
  //         })
  //     })
  //         .then(response => response.json())
  //         .then(user => {
  //         if (user.id) {
  //             this.props.loadUser(user)
  //             this.props.onRouteChange('home');
  //         }
  //         })
  //     }

  return (
    <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="b--black f6 w-100 ba br2 center pa2 input-reset bg-transparent hover-bg-black hover-white "
                type="email"
                name="email-address"
                id="email-address"
                onChange={({ target }) => setSignInEmail(target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b--black f6 w-100 ba br2 center pa2 input-reset bg-transparent hover-bg-black hover-white hover-black"
                type="password"
                name="password"
                id="password"
                onChange={({ target }) => setSignInPassword(target.value)}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => onSubmitSignIn()}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              href="#0"
              className="f6 link dim black db pointer"
              onClick={() => onRouteChange("register")}
            >
              Register?
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignIn;
