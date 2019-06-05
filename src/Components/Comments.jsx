import React, { Component } from "react";
import { getComments, postComment, deleteComment } from "../Api";
import "./Comments.css";
export default class Comments extends Component {
  state = { comments: [], userComment: "" };

  componentDidMount() {
    getComments(this.props.article_id).then(comments => {
      this.setState({ comments: comments });
    });
  }

  render() {
    const { comments } = this.state;

    return (
      <div>
        {this.props.loggedInUser ? (
          <form>
            Comment:
            <input onChange={this.handleOnChange} />
            <button onClick={this.postComment}>Post Comment</button>
          </form>
        ) : (
          <div id="NoUser">
            <p>Hey Log In To Comment!</p>
          </div>
        )}
        {comments.map(comment => {
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
              {comment.author === this.props.loggedInUser.username ? (
                <button onClick={() => deleteComment(comment.comment_id)}>
                  Delete Comment
                </button>
              ) : null}
            </li>
          );
        })}
      </div>
    );
  }
  handleOnChange = event => {
    this.setState({ userComment: event.target.value });
  };
  postComment = event => {
    event.preventDefault();
    let newComment = {
      username: this.props.loggedInUser.username,
      body: this.state.userComment
    };
    postComment(this.props.article_id, newComment).then(comment => {
      this.setState(prevState => {
        return { comments: [...prevState.comments, comment] };
      });
    });
  };
  deleteComment = (event, comment_id) => {
    event.preventDefault();
    deleteComment(comment_id).then(res => {
      console.log(res.data);
    });
  };
}
