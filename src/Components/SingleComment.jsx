import React, { Component } from "react";
import { updateCommentVotes } from "../Api";
import { Button, ListGroup } from "react-bootstrap";

export default class SingleComment extends Component {
  state = { voteChange: 0, disableButton: true };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.setState({ disableButton: false });
    }
    // if (prevProps.loggedInUser.length !== this.props.loggedInUser.length) {
    //   this.setState({ disableButton: false });
    // }
  }
  render() {
    const { comment } = this.props;
    return (
      <ListGroup id="Comment" key={comment.comment_id}>
        <ListGroup.Item variant="primary">{comment.author}:</ListGroup.Item>
        <ListGroup.Item>{comment.body}</ListGroup.Item>
        <Button
          variant="outline-secondary"
          disabled={this.state.disableButton || this.state.voteChange > 0}
          onClick={() => this.handleVoteChange(1)}
        >
          <span className="VoteButton" role="img" aria-label="upHand">
            ☝︎
          </span>
        </Button>
        <ListGroup.Item>{comment.votes + this.state.voteChange}</ListGroup.Item>
        <Button
          variant="outline-secondary"
          disabled={this.state.disableButton || this.state.voteChange < 0}
          onClick={() => this.handleVoteChange(-1)}
        >
          <span className="VoteButton" role="img" aria-label="downHand">
            ☟
          </span>
        </Button>
        {comment.author === this.props.loggedInUser.username ? (
          <Button
            variant="outline-secondary"
            onClick={() => this.props.deleteUserComment(comment.comment_id)}
          >
            Delete Comment
          </Button>
        ) : null}
        {comment.created_at}
      </ListGroup>
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
