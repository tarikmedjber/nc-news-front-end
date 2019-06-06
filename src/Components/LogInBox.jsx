import React, { Component } from "react";
import { getUsers } from "../Api";

export default class LogInBox extends Component {
  state = { usernameInput: "" };

  render() {
    if (this.props.logInButton === "LOG OUT") {
      return (
        <div className="LogOut">
          <button onClick={this.props.updateUsername}>LOG OUT</button>
        </div>
      );
    } else
      return (
        <div>
          <form id="LoginForm">
            Username:
            <input
              id="Input"
              onChange={this.handleUsernameChange}
              type="text"
              placeholder="Type Username Here"
            />
            <button id="SignIn" onClick={this.checkUsername}>
              Sign In
            </button>
          </form>
        </div>
      );
  }

  handleUsernameChange = event => {
    this.setState({ usernameInput: event.target.value });
  };
  checkUsername = event => {
    event.preventDefault();
    getUsers(this.state.usernameInput).then(user => {
      if (user) this.props.updateUsername(user);
    });
  };
}
