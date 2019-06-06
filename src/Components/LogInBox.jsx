import React, { Component } from "react";
import { getUsers } from "../Api";
export default class LogInBox extends Component {
  state = { usernameInput: "", userNotValid: null };

  render() {
    const { usernameInput, userNotValid } = this.state;
    const isAllFilledIn = usernameInput ? true : false;
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
            <p>{userNotValid}</p>
            <button
              disabled={!isAllFilledIn}
              id="SignIn"
              onClick={this.checkUsername}
            >
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
    if (this.state.usernameInput === "guest") {
      this.props.updateUsername("guest");
    }
    getUsers(this.state.usernameInput)
      .then(user => {
        if (user) {
          this.props.updateUsername(user);
        } else if (!user)
          this.setState({
            userNotValid:
              "Please sign in with a valid Username or log in as 'Guest"
          });
      })
      .catch(({ response }) => {
        this.setState({
          userNotValid:
            "Please sign in with a valid Username or log in as 'Guest"
        });
      });
  };
}
