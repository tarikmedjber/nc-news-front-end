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
import { Container } from "react-bootstrap";

class App extends React.Component {
  state = { loggedInUser: "", err: null };
  componentDidMount() {
    if (localStorage.hasOwnProperty("loggedInUser")) {
      let username = localStorage.getItem("loggedInUser");
      this.setState({
        loggedInUser: username
      });
    }
  }

  render() {
    const { loggedInUser } = this.state;
    console.log(loggedInUser, "loggedin");
    console.log(localStorage, "storage");

    return (
      <Container className="App">
        <Header
          loggedInUser={this.state.loggedInUser}
          loginUser={this.loginUser}
        />

        <Router>
          <Homepage path="/" />
          <ArticlesPage path="/articles" />
          <TopicsPage path="/topics" />
          <SingleArticle
            loggedInUser={loggedInUser}
            path="/articles/:article_id"
          />
          <SingleTopic path="/topics/:slug/articles" />
          <Comments
            path="/articles/:article_id/comments"
            loggedInUser={loggedInUser}
          />
          <UserProfile path="users/:username" />

          <Error default />
        </Router>
      </Container>
    );
  }
  loginUser = user => {
    if (this.state.loggedInUser.length < 1 && typeof user === "object") {
      localStorage.setItem("loggedInUser", JSON.stringify(user.username));
      this.setState({
        loggedInUser: user.username
      });
    } else if (this.state.loggedInUser.length < 1 && typeof user === "string") {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      this.setState({
        loggedInUser: user
      });
    } else if (this.state.loggedInUser.length > 0) {
      localStorage.removeItem("loggedInUser");

      this.setState({ loggedInUser: "" });
    }
  };
}

export default App;
