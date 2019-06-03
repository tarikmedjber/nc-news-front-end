import React from "react";
import { Link } from "@reach/router";
import "./Header.css";

export default function Header() {
  return (
    <div>
      <h1>NC-NEWS</h1>

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
        <Link id="Nav4" to="/users/">
          Users
        </Link>
        <button id="LogOut">LOG OUT</button>
      </div>
      <form id="SearchBar">
        <input type="text" placeholder="Search Articles..." />
        <button>SEARCH</button>
      </form>
    </div>
  );
}
