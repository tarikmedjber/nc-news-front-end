import React from "react";
// import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";
import { Nav } from "react-bootstrap";

export default function Header(props) {
  return (
    <div>
      <h1 id="Title">NC-NEWS</h1>
      <LogInBox
        loggedInUser={props.loggedInUser}
        logInButton={props.logInButton}
        loginUser={props.loginUser}
        userNotValid={props.userNotValid}
      />

      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link id="Nav1" href="/">
            Homepage
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="Nav2" href="/articles">
            Articles
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="Nav3" href="/topics">
            Topics
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
