import React, { Component } from "react";
import { getArticleById, updateArticleVotes } from "../Api";
import "./SingleArticle.css";
import { Link } from "@reach/router";
import Comments from "./Comments";
import Error from "./Error";
import { Button, Card } from "react-bootstrap";

export default class SingleArticle extends Component {
  state = { article: null, voteChange: 0, err: null };

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

  render() {
    const { article, voteChange, disableButton, err } = this.state;
    const { loggedInUser } = this.props;
    if (err) return <Error err={err} />;
    if (loggedInUser) {
      return (
        article && (
          <Card className="Article">
            <Card.Title className="card-header">{article.title}</Card.Title>
            <Link to={`/topics/${article.topic}/articles`}>
              <Card.Body>{`Topic: ${article.topic}`}</Card.Body>
            </Link>

            <div>
              <Card.Text id="ArticleBody">{article.body}</Card.Text>
              <Button
                variant="outline-secondary"
                disabled={disableButton || voteChange > 0}
                onClick={() => this.handleVoteChange(1)}
              >
                <span className="VoteButton" role="img" aria-label="upHand">
                  ☝︎
                </span>
              </Button>
              <p>{`${article.votes + voteChange} votes`}</p>
              <Button
                variant="outline-secondary"
                disabled={disableButton || voteChange < 0}
                onClick={() => this.handleVoteChange(-1)}
              >
                <span className="VoteButton" role="img" aria-label="downHand">
                  ☟
                </span>
              </Button>
            </div>

            <Comments
              article_id={article.article_id}
              loggedInUser={this.props.loggedInUser}
            />
          </Card>
        )
      );
    } else
      return (
        article && (
          <Card className="Article">
            <Card.Title className="card-header">{article.title}</Card.Title>
            <Link to={`/topics/${article.topic}/articles`}>
              <Card.Body>{`Topic: ${article.topic}`}</Card.Body>
            </Link>

            <div>
              <Card.Text id="ArticleBody">{article.body}</Card.Text>

              <p>{`${article.votes} votes`}</p>
            </div>

            <Comments
              article_id={article.article_id}
              loggedInUser={this.props.loggedInUser}
            />
          </Card>
        )
      );
  }
  handleVoteChange = direction => {
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    updateArticleVotes(this.state.article.article_id, {
      votes: direction
    }).catch(({ response }) => {
      const errMessage = response.statusText;
      const errStatus = response.status;
      const err = { errMessage, errStatus };
      console.log(response, "resonse");
      this.setState(prevState => {
        return { err, voteChange: prevState.voteChange - direction };
      });
    });
  };
}
