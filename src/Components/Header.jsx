import React from "react";
import { Link } from "@reach/router";
import "./Header.css";
import LogInBox from "./LogInBox";

export default function Header(props) {
  return (
    <div>
      <h1 id="Title">NC-NEWS</h1>
      <LogInBox
        logInButton={props.logInButton}
        updateUsername={props.updateUsername}
      />
      {/* <h4>
        <Link to="/articles" id="LogOut">
          {props.logInButton}
        </Link>
      </h4> */}
      <div className="Navs">
        <Link id="Nav1" to="/">
          Homepage
        </Link>
        <Link id="Nav2" to="/articles">
          Articles
        </Link>
        <Link id="Nav3" to="/topics">
          Topics
        </Link>
        <Link id="Nav4" to="/users">
          Users
        </Link>
      </div>
    </div>
  );
}