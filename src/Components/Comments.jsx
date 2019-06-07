import React, { Component } from "react";
import { getComments, postComment, deleteComment } from "../Api";
import "./Comments.css";
import SingleComment from "./SingleComment";
import Error from "./Error";
import { Button } from "react-bootstrap";
export default class Comments extends Component {
  state = { comments: [], userComment: "", disableButton: true, err: null };
  componentDidMount() {
    getComments(this.props.article_id)
      .then(comments => {
        this.setState({ comments: comments });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.setState({ disableButton: false });
    }
  }

  render() {
    const { comments, userComment, err } = this.state;
    if (err) return <Error err={err} />;
    let isAllFilledIn = userComment ? true : false;
    return (
      <div>
        {this.props.loggedInUser ? (
          <form>
            Comment:
            <input onChange={this.handleOnChange} />
            <Button
              variant="outline-secondary"
              disabled={!isAllFilledIn}
              onClick={this.postComment}
            >
              Post Comment
            </Button>
          </form>
        ) : (
          <div id="NoUser">
            <p>Log In To Comment And Vote</p>
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
