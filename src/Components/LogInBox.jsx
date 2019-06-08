import React, { Component } from "react";
import { getUser } from "../Api";
import { Button } from "react-bootstrap";
import "./Header.css";
export default class LogInBox extends Component {
  state = { usernameInput: "", userNotValid: null };

  render() {
    console.log(this.props.loggedInUser, "guest");
    const { usernameInput, userNotValid } = this.state;
    const isAllFilledIn = usernameInput ? true : false;
    if (this.props.loggedInUser.length > 0) {
      return (
        <div className="LogOut">
          <Button variant="outline-secondary" onClick={this.props.loginUser}>
            LOG OUT
          </Button>
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
            <p className="signInMessage">Sign in as 'guest'</p>
            <p>{userNotValid}</p>
            <Button
              variant="outline-secondary"
              disabled={!isAllFilledIn}
              id="SignIn"
              onClick={this.checkUsername}
            >
              Sign In
            </Button>
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
      this.setState({ userNotValid: null });
      this.props.loginUser("guest");
    }
    getUser(this.state.usernameInput)
      .then(user => {
        if (user) {
          this.setState({ userNotValid: null });

          this.props.loginUser(user);
        }
      })
      .catch(({ response }) => {
        this.setState({
          userNotValid:
            "Please sign in with a valid Username or log in as 'guest"
        });
      });
  };
}
