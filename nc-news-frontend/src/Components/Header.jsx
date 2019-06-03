import React from "react";
import { Link } from "@reach/router";
import "./Header.css";

export default function Header() {
  return (
    <div>
      <h1>NC-NEWS</h1>
      <div className="Navs">
        <Link to="/">Homepage</Link>

        <Link to="/articles">Articles</Link>

        <Link to="/topics">Topics</Link>

        <Link to="/users/">Users</Link>
      </div>
    </div>
  );
}
