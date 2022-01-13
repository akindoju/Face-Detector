import React from "react";

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
      `https://7e631cv7hl.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ emoji: data.input }))
      .catch(console.log);
  };
  render() {
    return (
      <div>
        <div className="white f3 rank">
          <p className="rank__text">{`${this.props.name} , your current rank is...`}</p>
          <div className="white rank__entries">{this.props.entries}</div>
          <div className="white rank__badge">{`Rank Badge: ${this.state.emoji}`}</div>
        </div>
      </div>
    );
  }
}

export default Rank;
