import React from "react";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

const navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  return (
    <nav>
      {isSignedIn && (
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      )}
    </nav>
  );
};

export default navigation;
