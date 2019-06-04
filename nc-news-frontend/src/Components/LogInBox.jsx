import React, { Component } from "react";

export default class LogInBox extends Component {
  state = { usernameInput: "" };
  render() {
    return (
      <div>
        <form>
          Username:
          <input
            onChange={this.handleUsernameChange}
            type="text"
            placeholder="Type Username Here"
          />
          <button>Sign In</button>
        </form>
        <p>login box</p>
      </div>
    );
  }
  handleUsernameChange = event => {
    this.setState({ usernameInput: event.target.value });
  };
}
