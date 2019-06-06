import React, { Component } from "react";
import { getComments, postComment, deleteComment } from "../Api";
import "./Comments.css";
import SingleComment from "./SingleComment";
export default class Comments extends Component {
  state = { comments: [], userComment: "", disableButton: true };
  componentDidMount() {
    getComments(this.props.article_id).then(comments => {
      this.setState({ comments: comments });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.setState({ disableButton: false });
    }
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
        <ul>
          {comments &&
            comments.map(comment => {
              return (
                <SingleComment
                  deleteUserComment={this.deleteUserComment}
                  comment_id={comment.comment_id}
                  comment={comment}
                  key={comment.comment_id}
                  loggedInUser={this.props.loggedInUser}
                />
              );
            })}
        </ul>
      </div>
    );
  }
  deleteUserComment = comment_id => {
    deleteComment(comment_id).then(res => {
      this.setState(prevState => {
        return {
          comments: [
            ...prevState.comments.filter(comment => {
              return comment.comment_id !== comment_id;
            })
          ]
        };
      });
    });
  };
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
        return { comments: [comment, ...prevState.comments] };
      });
    });
  };
}
