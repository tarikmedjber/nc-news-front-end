import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import ArticlesPage from "./Components/ArticlesPage";
import Homepage from "./Components/Homepage";
import Topics from "./Components/Topics";
import UserArticle from "./Components/UserArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Homepage path="/" />
        <ArticlesPage path="/articles/*" />
        <UserArticle path="/users/*" />
        <Topics path="/topics" />
        <UserArticle path="/users/:username" />
      </Router>
    </div>
  );
}

export default App;
