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

    if (!loggedInUser) {
      return (
        <div className="commentsList">
          <ListGroup id="Comment" key={comment.comment_id}>
            <Link to={`/users/${comment.author}`}>
              <ListGroup.Item variant="primary">
                {comment.author}:
              </ListGroup.Item>
            </Link>
            <ListGroup.Item>{comment.body}</ListGroup.Item>
            <ListGroup.Item>{`${comment.votes +
              voteChange} votes`}</ListGroup.Item>
            {comment.created_at.slice(0, 10)}
          </ListGroup>
        </div>
      );
    } else
      return (
        <div className="commentsList">
          <ListGroup id="Comment" key={comment.comment_id}>
            <Link to={`/users/${comment.author}`}>
              <ListGroup.Item variant="primary">
                {comment.author}:
              </ListGroup.Item>
            </Link>
            <ListGroup.Item>{comment.body}</ListGroup.Item>
            <Button
              variant="outline-secondary"
              disabled={disableButton || voteChange > 0}
              onClick={() => this.handleVoteChange(1)}
            >
              <span className="VoteButton" role="img" aria-label="upHand">
                ☝︎
              </span>
            </Button>
            <ListGroup.Item>{`${comment.votes +
              voteChange} votes`}</ListGroup.Item>
            <Button
              variant="outline-secondary"
              disabled={disableButton || voteChange < 0}
              onClick={() => this.handleVoteChange(-1)}
            >
              <span className="VoteButton" role="img" aria-label="downHand">
                ☟
              </span>
            </Button>
            {comment.author === loggedInUser ? (
              <Button
                variant="outline-secondary"
                onClick={() => this.props.deleteUserComment(comment.comment_id)}
              >
                Delete Comment
              </Button>
            ) : null}
            {comment.created_at.slice(0, 10)}
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
