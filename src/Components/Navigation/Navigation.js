import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <ProfileIcon />
        <p
          className="f3 link dim black pa3 pointer"
          onClick={() => onRouteChange("SignIn")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("SignIn")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>

        <p
          onClick={() => onRouteChange("Register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default navigation;
