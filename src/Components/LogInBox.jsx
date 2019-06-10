import React, { Component } from "react";
import { getUser } from "../Api";
import { Button } from "react-bootstrap";
import "./Header.css";
import { Link } from "@reach/router";

export default class LogInBox extends Component {
  state = { usernameInput: "", userNotValid: null };

  render() {
    const { usernameInput, userNotValid } = this.state;
    const isAllFilledIn = usernameInput ? true : false;
    let usersPic = null;

    if (localStorage.hasOwnProperty("usersPic")) {
      usersPic = JSON.parse(localStorage.getItem("usersPic"));
    }

    if (this.props.loggedInUser.length > 0) {
      return (
        <div className="LogInBox">
          {localStorage.hasOwnProperty("usersPic") ? (
            <Link to={`/users/${this.props.loggedInUser}`}>
              <img className="usersPic" src={usersPic} alt="users pic" />
            </Link>
          ) : null}
          <Button variant="outline-secondary" onClick={this.props.loginUser}>
            LOG OUT
          </Button>
        </div>
      );
    } else
      return (
        <div className="LogInBox">
          <form id="LoginForm" onSubmit={this.handleSubmit}>
            <div id="usernameInput">
              Username:
              <input
                id="Input"
                onChange={this.handleUsernameChange}
                type="text"
                placeholder="Type Username Here"
              />
            </div>
            <p className="signInMessage">Sign in as 'guest'</p>
            <p>{userNotValid}</p>
            <Button
              variant="outline-secondary"
              disabled={!isAllFilledIn}
              id="SignIn"
              onClick={this.handleSubmit}
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
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.usernameInput === "guest") {
      this.setState({ userNotValid: null });
      this.props.loginUser("guest");
    }
    getUser(this.state.usernameInput)
      .then(user => {
        if (user) {
          localStorage.setItem("usersPic", JSON.stringify(user.avatar_url));
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
