import React, { Component } from "react";
import Navigation from "./Components/Navigation/Navigation";
import ImageLinkform from "./Components/ILF/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Modal from "./Components/Modal/Modal";
import Profile from "./Components/Profile/Profile";
import "./App.scss";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signIn",
  isSignedIn: false,
  isProfileOpen: false,
  istestLinkVisible: true,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    phone: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetch("https://shrouded-refuge-87212.herokuapp.com/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            fetch(
              `https://shrouded-refuge-87212.herokuapp.com/profile/${data.id}`,
              {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
              }
            )
              .then((resp) => resp.json())
              .then((user) => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              });
          }
        })
        .catch(console.log);
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  faceCalculations = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    } else return;
  };

  displayFaceBoxes = (boxes) => {
    if (boxes) {
      this.setState({ boxes: boxes });
    }
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ istestLinkVisible: false });
    this.setState({ imageUrl: this.state.input });
    fetch("https://shrouded-refuge-87212.herokuapp.com/imageUrl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://shrouded-refuge-87212.herokuapp.com/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.localStorage.getItem("token"),
            },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBoxes(this.faceCalculations(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signIn") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      isProfileOpen: !this.state.isProfileOpen,
    }));
  };

  render() {
    const { isSignedIn, boxes, imageUrl, route, isProfileOpen, user } =
      this.state;
    return (
      <div className="app">
        <div className="mainPage">
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
            toggleModal={this.toggleModal}
          />
          {isProfileOpen && (
            <Modal>
              <Profile
                isProfileOpen={isProfileOpen}
                toggleModal={this.toggleModal}
                user={user}
                loadUser={this.loadUser}
              />
            </Modal>
          )}
          {route === "home" ? (
            <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkform
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                boxes={boxes}
                imageUrl={imageUrl}
                istestLinkVisible={this.state.istestLinkVisible}
                input={this.state.input}
              />
            </div>
          ) : route === "signIn" ? (
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}

          <svg
            width="1280"
            height="111"
            viewBox="0 0 1380 111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="app__svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0L62.1094 4.17052C125.391 8.34104 249.609 16.6821 375 30.7977C500.391 45.2341 624.609 65.7659 750 69.9364C875.391 74.1069 999.609 61.5954 1125 57.7457C1250.39 53.5751 1374.61 57.7457 1437.89 59.6705L1500 61.5954V111H1437.89C1374.61 111 1250.39 111 1125 111C999.609 111 875.391 111 750 111C624.609 111 500.391 111 375 111C249.609 111 125.391 111 62.1094 111H0V0Z"
              fill="#20DF7F"
              fillOpacity="0.09"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 44.4L50 53.28C100 62.16 200 79.92 300 75.48C400 71.04 500 44.4 600 26.64C700 8.88 800 0 900 0C1000 0 1100 8.88 1200 24.42C1300 39.96 1400 62.16 1450 73.26L1500 84.36V111H1450C1400 111 1300 111 1200 111C1100 111 1000 111 900 111C800 111 700 111 600 111C500 111 400 111 300 111C200 111 100 111 50 111H0V44.4Z"
              fill="#E5E5E5"
              fillOpacity="0.13"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
