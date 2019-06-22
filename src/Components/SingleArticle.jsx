import React, { Component } from "react";
import { getArticleById, updateArticleVotes } from "../Api";
import "./SingleArticle.css";
import { Link } from "@reach/router";
import Comments from "./Comments";
import Error from "./Error";
import { Button, Card } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

export default class SingleArticle extends Component {
  state = { article: null, voteChange: 0, err: null, loading: true };

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article: article, loading: false });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        this.setState({ err });
      });
  }

  render() {
    const { article, voteChange, disableButton, err, loading } = this.state;
    const { loggedInUser } = this.props;
    if (err) return <Error err={err} />;
    if (loading)
      return (
        <div className="sweet-loading">
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
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
              <Link to={`/users/${article.author}`}>
                <Card.Text>{`Created by ${article.author}  `}</Card.Text>
              </Link>
            </div>

            <Comments
              articleTitle={article.title}
              comment_count={article.comment_count}
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
            <Link to={`/users/${article.author}`}>
              <Card.Text>{`Created by ${article.author}  `}</Card.Text>
            </Link>

            <Comments
              articleTitle={article.title}
              comment_count={article.comment_count}
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
      this.setState(prevState => {
        return { err, voteChange: prevState.voteChange - direction };
      });
    });
  };
}
