import React, { Component } from "react";
import { updateCommentVotes } from "../Api";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "@reach/router";
import "./Comments.css";

export default class SingleComment extends Component {
  state = { voteChange: 0, disableButton: true };

  componentDidMount() {
    if (localStorage.hasOwnProperty("loggedInUser")) {
      this.setState({ disableButton: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.loggedInUser !== this.props.loggedInUser &&
      this.props.loggedInUser
    ) {
      this.setState({ disableButton: false });
    } else if (
      prevProps.loggedInUser.length !== this.props.loggedInUser.length &&
      !this.props.loggedInUser
    ) {
      this.setState({ disableButton: true });
    }
  }
  render() {
    const { voteChange, disableButton } = this.state;
    const { comment, loggedInUser } = this.props;
    let date = comment.created_at
      .slice(0, 10)
      .split("-")
      .reverse()
      .join()
      .replace(/,/g, "-");

    if (!loggedInUser) {
      return (
        <div className="commentsList">
          <ListGroup id="Comment" key={comment.comment_id}>
            <Link to={`/users/${comment.author}`}>
              <ListGroup.Item variant="info">{comment.author}:</ListGroup.Item>
            </Link>
            <ListGroup.Item variant="warning">{comment.body}</ListGroup.Item>
            <ListGroup.Item variant="warning">{`${comment.votes +
              voteChange} votes`}</ListGroup.Item>
            <ListGroup.Item variant="warning">{date}</ListGroup.Item>
          </ListGroup>
        </div>
      );
    } else
      return (
        <div className="commentsList">
          <ListGroup id="Comment" key={comment.comment_id}>
            <Link to={`/users/${comment.author}`}>
              <ListGroup.Item variant="info">{comment.author}:</ListGroup.Item>
            </Link>
            <ListGroup.Item variant="warning">{comment.body}</ListGroup.Item>
            <ListGroup.Item variant="warning">
              <Button
                variant="outline-secondary"
                disabled={disableButton || voteChange > 0}
                onClick={() => this.handleVoteChange(1)}
              >
                <span className="VoteButton" role="img" aria-label="upHand">
                  ☝︎
                </span>
              </Button>
            </ListGroup.Item>
            <ListGroup.Item variant="warning">{`${comment.votes +
              voteChange} votes`}</ListGroup.Item>
            <ListGroup.Item variant="warning" />
            <ListGroup.Item variant="warning">
              <Button
                variant="outline-secondary"
                disabled={disableButton || voteChange < 0}
                onClick={() => this.handleVoteChange(-1)}
              >
                <span className="VoteButton" role="img" aria-label="downHand">
                  ☟
                </span>
              </Button>
            </ListGroup.Item>
            {comment.author === loggedInUser ? (
              <ListGroup.Item variant="warning">
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    this.props.deleteUserComment(comment.comment_id)
                  }
                >
                  Delete Comment
                </Button>
              </ListGroup.Item>
            ) : null}
            <ListGroup.Item variant="warning">{date}</ListGroup.Item>
          </ListGroup>
        </div>
      );
  }

  handleVoteChange = direction => {
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    updateCommentVotes(this.props.comment_id, {
      votes: direction
    }).catch();
  };
}
