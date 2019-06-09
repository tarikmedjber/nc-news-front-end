import React, { Component } from "react";
import { getComments, postComment, deleteComment } from "../Api";
import "./Comments.css";
import SingleComment from "./SingleComment";
import Error from "./Error";
import PostComment from "./PostComment";

export default class Comments extends Component {
  state = {
    comments: [],
    disableButton: true,
    err: null
  };
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
    const { comments, err } = this.state;
    console.log(err, "err");
    const { loggedInUser, article_id } = this.props;

    if (
      err &&
      err.errMessage !==
        "Sorry you cannot post a comment right now please try again later"
    ) {
      return <Error err={err} />;
    }
    return (
      <div>
        {loggedInUser && !err ? (
          <PostComment
            postComment={this.postComment}
            loggedInUser={loggedInUser}
            article_id={article_id}
          />
        ) : err.errMessage ===
          "Sorry you cannot post a comment right now please try again later" ? (
          <div id="NoUser">
            <h6>{err.errMessage}</h6>
          </div>
        ) : (
          <div id="NoUser">
            <h6>Please Log In To Comment And Vote</h6>
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
                  loggedInUser={loggedInUser}
                />
              );
            })}
        </ul>
      </div>
    );
  }
  deleteUserComment = comment_id => {
    deleteComment(comment_id)
      .then(res => {
        this.setState(prevState => {
          return {
            comments: [
              ...prevState.comments.filter(comment => {
                return comment.comment_id !== comment_id;
              })
            ]
          };
        });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });
  };
  postComment = userComment => {
    const newComment = {
      username: this.props.loggedInUser,
      body: userComment
    };
    postComment(this.props.article_id, newComment)
      .then(comment => {
        this.setState(prevState => {
          return { comments: [comment, ...prevState.comments] };
        });
      })
      .catch(({ response }) => {
        const errMessage =
          "Sorry you cannot post a comment right now please try again later";
        const err = { errMessage };
        console.log(response, "resonse");
        this.setState({ err });
      });
  };
}
