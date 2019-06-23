import React from "react";
import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import TopicsPage from "./TopicsPage";

export default function Header(props) {
  return (
    <Nav className="justify-content-center" variant="tabs" id="Header">
      <Navbar bg="light" className="NavBar">
        <Navbar.Brand className="navbar-brand ">NC-NEWS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
        <NavDropdown title="Topics" className="nav-dropdown">
          <TopicsPage />
        </NavDropdown>

        <Nav className="justify-content-end" variant="pills">
          <LogInBox
            loggedInUser={props.loggedInUser}
            loginUser={props.loginUser}
            userNotValid={props.userNotValid}
          />
        </Nav>
      </Navbar>
    </Nav>
  );
}
