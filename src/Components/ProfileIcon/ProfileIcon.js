import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    return (
      <div className="profileIcon">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 ba h4 w4 dib"
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu
            className="b--transparent shadow-5 dropdownMenu"
            style={{
              marginTop: "35px",
              marginLeft: "0",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          >
            <DropdownItem
              className="dropdownMenu__item"
              onClick={() => this.props.toggleModal()}
            >
              View Profile
            </DropdownItem>
            <DropdownItem
              className="dropdownMenu__item"
              onClick={() => this.props.onRouteChange("signIn")}
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
