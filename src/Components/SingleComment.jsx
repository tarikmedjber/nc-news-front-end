import React, { Component } from "react";
import { deleteComment } from "../Api";

export default class SingleComment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <li id="Comment" key={comment.comment_id}>
        <h3>{comment.author}:</h3>
        <p>{comment.body}</p>
        <div>
          <span className="VoteButton" role="img" aria-label="upHand">
            ☝︎
          </span>
          <p>{comment.votes}</p>
          <span className="VoteButton" role="img" aria-label="downHand">
            ☟
          </span>
        </div>
        {
          <button onClick={() => this.deleteUserComment(comment.comment_id)}>
            Delete Comment
          </button>
        }
        {comment.created_at}
      </li>
    );
  }
  deleteUserComment = comment_id => {
    deleteComment(comment_id).then(res => {
      console.log(res);
    });
  };
}
