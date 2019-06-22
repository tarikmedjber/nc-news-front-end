import React from "react";
import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import TopicsPage from "./TopicsPage";

export default function Header(props) {
  return (
    <div className="Header">
      <Navbar bg="light" variant="tabs" className="NavBar">
        <Navbar.Brand>NC-NEWS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="justify-content-center">
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
          <NavDropdown title="Topics" id="nav-dropdown">
            <TopicsPage />
          </NavDropdown>
        </Nav>
        <Nav className="justify-content-end">
          <LogInBox
            loggedInUser={props.loggedInUser}
            loginUser={props.loginUser}
            userNotValid={props.userNotValid}
          />
        </Nav>
      </Navbar>
    </div>
  );
}
