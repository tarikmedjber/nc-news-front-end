import React, { Component } from "react";
import { updateCommentVotes } from "../Api";

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
      <li id="Comment" key={comment.comment_id}>
        <h3>{comment.author}:</h3>
        <p>{comment.body}</p>
        <button
          disabled={this.state.disableButton || this.state.voteChange > 0}
          onClick={() => this.handleVoteChange(1)}
        >
          <span className="VoteButton" role="img" aria-label="upHand">
            ☝︎
          </span>
        </button>
        <p>{comment.votes + this.state.voteChange}</p>
        <button
          disabled={this.state.disableButton || this.state.voteChange < 0}
          onClick={() => this.handleVoteChange(-1)}
        >
          <span className="VoteButton" role="img" aria-label="downHand">
            ☟
          </span>
        </button>
        {comment.author === this.props.loggedInUser.username ? (
          <button
            onClick={() => this.props.deleteUserComment(comment.comment_id)}
          >
            Delete Comment
          </button>
        ) : null}
        {comment.created_at}
      </li>
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
