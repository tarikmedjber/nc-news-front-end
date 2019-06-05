import React, { Component } from "react";
import { getUsers } from "../Api";

export default class LogInBox extends Component {
  state = { usernameInput: "" };

  render() {
    if (this.props.logInButton === "LOG IN") {
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
    } else
      return (
        <div>
          <button onClick={() => this.props.updateUsername()}>Log Out</button>
        </div>
      );
  }
  handleUsernameChange = event => {
    console.log(event.target.value);
    this.setState({ usernameInput: event.target.value });
  };
  checkUsername = event => {
    event.preventDefault();
    getUsers(this.state.usernameInput).then(user => {
      if (user) this.props.updateUsername(user);
    });
  };
}
/*
    Calls in app, function is in app where the function changes the apps state on a submit where they get logged in.
    Login box needs the handle sumit and store user input as they type, check user exists in the loginbox file so need to make 
    a request here to the users endpoint. 
    Then simply put in conditional logic before any divs(?) to see if its truthy. 
    Local storage in mount to show that the person has logged in. 


*/
