import React, { useState } from "react";

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: "",
    };
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.entries === this.props.entries &&
      prevProps.name === this.props.name
    ) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(
      `https://twlvnl7hai.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ emoji: data.input }))
      .catch(console.log);
  };
  render() {
    return (
      <div>
        <div className="white f3">
          <p>{`${this.props.name} , your current rank is...`}</p>
          <div className="white f1 ">{this.props.entries}</div>
          <div className="white f1 ">{`Rank Badge: ${this.state.emoji}`}</div>
        </div>
      </div>
    );
  }
}

export default Rank;
