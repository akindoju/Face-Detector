import React from "react";
import "./Profile.css";

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
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>{`Images Submitted: ${this.props.user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              this.props.user.joined
            ).toLocaleDateString()}`}</p>
            <hr />

            <label className="mt2 fw6" htmlFor="user-email">
              Email:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={this.props.user.email}
              type="text"
              name="user-email"
              id="user-email"
            />

            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={this.props.user.name}
              type="text"
              name="user-name"
              id="user-name"
            />

            <label className="mt2 fw6" htmlFor="user-phone">
              Phone Number:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={this.props.user.phone}
              type="text"
              name="user-phone"
              id="user-phone"
            />

            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                onClick={() => {
                  this.onProfileUpdate({ name, phone, email });
                }}
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              >
                Save
              </button>

              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={() => this.props.toggleModal()}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={() => this.props.toggleModal()}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
