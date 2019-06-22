import React from "react";
import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";
import { Navbar, Nav } from "react-bootstrap";
import TopicsPage from "./TopicsPage";

export default function Header(props) {
  return (
    <div className="Header">
      <Navbar bg="light" variant="tabs" className="NavBar">
        <h1 className="bg-info">NC - NEWS</h1>
        <Nav>
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
        <div>
          <LogInBox
            loggedInUser={props.loggedInUser}
            loginUser={props.loginUser}
            userNotValid={props.userNotValid}
          />
        </div>
      </Navbar>
    </div>
  );
}
