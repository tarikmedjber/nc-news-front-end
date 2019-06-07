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
  state = { logInButton: "", loggedInUser: "", err: null };
  componentDidMount() {
    if (localStorage.hasOwnProperty("loggedInUser")) {
      let username = localStorage.getItem("loggedInUser");
      username = JSON.parse(username);
      console.log(username, "user");
      this.setState({
        loggedInUser: username
      });
    }
  }

  render() {
    const { err, loggedInUser, logInButton } = this.state;
    console.log(loggedInUser, "loggedin");
    console.log(localStorage, "storage");

    if (err) console.log(err);
    return (
      <Container className="App">
        <Header
          logInButton={this.state.logInButton}
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
    if (this.state.logInButton === "" && typeof user === "object") {
      localStorage.setItem("loggedInUser", JSON.stringify(user.username));
      this.setState({
        loggedInUser: user,
        logInButton: "LOG OUT"
      });
    } else if (this.state.logInButton === "" && typeof user === "string") {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      this.setState({
        loggedInUser: user,
        logInButton: "LOG OUT"
      });
    } else if (this.state.logInButton === "LOG OUT") {
      localStorage.removeItem("loggedInUser");

      this.setState({ loggedInUser: "", logInButton: "" });
    }
  };
}

export default App;
