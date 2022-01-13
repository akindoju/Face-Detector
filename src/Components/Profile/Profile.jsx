import React from "react";
import "./Profile.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.user.email,
      name: this.props.user.name,
      phone: this.props.user.phone,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-phone":
        this.setState({ phone: event.target.value });
        break;
      case "user-email":
        this.setState({ email: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { name, phone, email } = this.state;
    return (
      <div className="profile-modal">
        <article className="profile-modal__container">
          <div className="profile-modal__container--top">
            <img src="http://tachyons.io/img/logo.jpg" alt="avatar" />
            <h1>{this.state.name}</h1>
            <h4>{`Images Submitted: ${this.props.user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              this.props.user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
          </div>

          <div className="profile-modal__container--body">
            <label htmlFor="user-email">Email:</label>
            <input
              onChange={this.onFormChange}
              placeholder={this.props.user.email}
              type="text"
              name="user-email"
              id="user-email"
            />

            <label htmlFor="user-name">Name:</label>
            <input
              onChange={this.onFormChange}
              placeholder={this.props.user.name}
              type="text"
              name="user-name"
              id="user-name"
            />

            <label htmlFor="user-phone">Phone Number:</label>
            <input
              onChange={this.onFormChange}
              placeholder={this.props.user.phone}
              type="text"
              name="user-phone"
              id="user-phone"
            />
          </div>

          <div
            className="profile-modal__container--bottom"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => {
                this.onProfileUpdate({ name, phone, email });
              }}
            >
              Save
            </button>

            <button onClick={() => this.props.toggleModal()}>Cancel</button>
          </div>

          <div className="modal-close" onClick={() => this.props.toggleModal()}>
            <p>&times;</p>
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
