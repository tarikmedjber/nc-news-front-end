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

class App extends React.Component {
  state = { logInButton: "", loggedInUser: "" };
  render() {
    return (
      <div className="App">
        <Header
          logInButton={this.state.logInButton}
          updateUsername={this.updateUsername}
        />

        <Router>
          <Homepage path="/" />
          <ArticlesPage path="/articles" />
          <UserArticle path="/users/*" />
          <TopicsPage path="/topics" />
          <UserArticle path="/users/:username" />
          <SingleArticle
            loggedInUser={this.state.loggedInUser}
            path="/articles/:article_id"
          />
          <SingleTopic path="/topics/:slug/articles" />
          <Comments
            path="/articles/:article_id/comments"
            loggedInUser={this.state.loggedInUser}
          />
        </Router>
      </div>
    );
  }
  updateUsername = user => {
    if (this.state.logInButton === "") {
      this.setState({ loggedInUser: user, logInButton: "LOG OUT" });
    } else if (this.state.logInButton === "LOG OUT") {
      this.setState({ loggedInUser: "", logInButton: "" });
    }
  };
}

export default App;
