import React, { Component } from "react";
import { getArticleById, updateArticleVotes } from "../Api";
import "./SingleArticle.css";
import { Link } from "@reach/router";
import Comments from "./Comments";

export default class SingleArticle extends Component {
  state = { article: null, voteChange: 0 };

  componentDidMount() {
    getArticleById(this.props.article_id).then(article => {
      this.setState({ article: article });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      getArticleById(this.props.article_id).then(article => {
        this.setState({ article: article });
      });
    }
  }

  render() {
    console.log(this.state.voteChange);

    const { article } = this.state;
    return (
      article && (
        <div>
          <h2>{article.title}</h2>
          <Link to={`/topics`}>
            <h3>{`Topic: ${article.topic}`}</h3>
          </Link>

          <div className="Article">
            <h3 id="ArticleBody">{article.body}</h3>
            <button onClick={() => this.handleVoteChange(1)}>
              <span className="VoteButton" role="img" aria-label="upHand">
                ☝︎
              </span>
            </button>
            <p>{article.votes + this.state.voteChange}</p>
            <button onClick={() => this.handleVoteChange(-1)}>
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
