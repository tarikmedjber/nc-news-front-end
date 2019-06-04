import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import ArticlesPage from "./Components/ArticlesPage";
import Homepage from "./Components/Homepage";
import TopicsPage from "./Components/TopicsPage";
import UserArticle from "./Components/UserArticle";
import SingleArticle from "./Components/SingleArticle";
import SingleTopic from "./Components/SingleTopic";
import Comments from "./Components/Comments";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Homepage path="/" />
        <ArticlesPage path="/articles" />
        <UserArticle path="/users/*" />
        <TopicsPage path="/topics" />
        <UserArticle path="/users/:username" />
        <SingleArticle path="/articles/:article_id" />
        <SingleTopic path="/topics/:slug/articles" />
        <Comments path="/articles/:article_id/comments" />
      </Router>
    </div>
  );
}

export default App;
