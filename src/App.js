import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Router } from "@reach/router";
import ArticlesPage from "./Components/ArticlesPage";
import Homepage from "./Components/Homepage";
import TopicsPage from "./Components/TopicsPage";
import UserProfile from "./Components/UserProfile";
import SingleArticle from "./Components/SingleArticle";
import SingleTopic from "./Components/SingleTopic";
import Comments from "./Components/Comments";
import Error from "./Components/Error";

class App extends React.Component {
  state = { logInButton: "", loggedInUser: "", stuff: null, err: null };
  render() {
    const { err } = this.state;
    if (err) console.log(err);
    return (
      <div className="App">
        <Header
          logInButton={this.state.logInButton}
          updateUsername={this.updateUsername}
        />

        <Router>
          <Error default />
          <Homepage path="/" />
          <ArticlesPage path="/articles" />
          <TopicsPage path="/topics" />
          <SingleArticle
            loggedInUser={this.state.loggedInUser}
            path="/articles/:article_id"
          />
          <SingleTopic path="/topics/:slug/articles" />
          <Comments
            path="/articles/:article_id/comments"
            loggedInUser={this.state.loggedInUser}
          />
          <UserProfile path="users/:username" />
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
