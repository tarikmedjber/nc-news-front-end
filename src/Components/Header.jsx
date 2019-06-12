import React from "react";
import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";
import { Navbar, Nav } from "react-bootstrap";
import TopicsPage from "./TopicsPage";

export default function Header(props) {
  return (
    <div id="Header">
      <LogInBox
        loggedInUser={props.loggedInUser}
        loginUser={props.loginUser}
        userNotValid={props.userNotValid}
      />
      <Navbar bg="light" variant="tabs" className="navBar">
        <h1 class="bg-info">NC - NEWS</h1>
        <Nav className="navItems">
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
          <Nav.Item id="Nav3">
            <TopicsPage />
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
}
