import React from "react";
import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";
import { Nav } from "react-bootstrap";

export default function Header(props) {
  return (
    <div id="Header">
      <h1 id="Title">NC-NEWS</h1>
      <LogInBox
        loggedInUser={props.loggedInUser}
        loginUser={props.loginUser}
        userNotValid={props.userNotValid}
      />

      <Nav variant="tabs">
        <Nav.Item>
          <Link id="Nav1" to="/">
            Homepage
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link id="Nav2" to="/articles">
            Articles
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link id="Nav3" to="/topics">
            Topics
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
