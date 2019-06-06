import React, { Component } from "react";
import { getArticleById, updateArticleVotes } from "../Api";
import "./SingleArticle.css";
import { Link } from "@reach/router";
import Comments from "./Comments";
import Error from "./Error";

export default class SingleArticle extends Component {
  state = { article: null, voteChange: 0, disableButton: true, err: null };

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article: article });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.setState({ disableButton: false });
    }
    // if (
    //   prevProps.loggedInUser !== this.props.loggedInUser &&
    //   this.props.loggedInUser.length < 1
    // ) {
    //   this.setState({ disableButton: false });
    // }
  }

  render() {
    const { article, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      article && (
        <div>
          <h2>{article.title}</h2>
          <Link to={`/topics/${article.topic}/articles`}>
            <h3>{`Topic: ${article.topic}`}</h3>
          </Link>

          <div className="Article">
            <h3 id="ArticleBody">{article.body}</h3>
            <button
              disabled={this.state.disableButton || this.state.voteChange > 0}
              onClick={() => this.handleVoteChange(1)}
            >
              <span className="VoteButton" role="img" aria-label="upHand">
                ☝︎
              </span>
            </button>
            <p>{article.votes + this.state.voteChange}</p>
            <button
              disabled={this.state.disableButton || this.state.voteChange < 0}
              onClick={() => this.handleVoteChange(-1)}
            >
              <span className="VoteButton" role="img" aria-label="downHand">
                ☟
              </span>
            </button>
          </div>

          <Comments
            article_id={article.article_id}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
      )
    );
  }
  handleVoteChange = direction => {
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    updateArticleVotes(this.state.article.article_id, {
      votes: direction
    }).catch();
  };
}
