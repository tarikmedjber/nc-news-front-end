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
    sortBy: "created_at",
    err: null,
    page: 1
  };
  componentDidMount() {
    getComments(this.props.article_id, {})
      .then(comments => {
        this.setState({ comments: comments });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        this.setState({ err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.setState({ disableButton: false });
    }
    if (prevState.sortBy !== this.state.sortBy) {
      getComments(this.props.article_id, { sort_by: this.state.sortBy })
        .then(comments => {
          this.setState({ comments: comments });
        })
        .catch(({ response }) => {
          const errMessage = response.statusText;
          const errStatus = response.status;
          const err = { errMessage, errStatus };
          this.setState({ err });
        });
    }
    if (prevState.page !== this.state.page) {
      getComments(this.props.article_id, { p: this.state.page }).then(
        comments => {
          this.setState({ comments: comments });
        }
      );
    }
  }

  render() {
    const { comments, err, sortBy } = this.state;
    const { loggedInUser, article_id } = this.props;

    if (
      err &&
      err.errMessage !==
        "Sorry you cannot post a comment right now please try again later. If you are signed in as 'guest' you cannot comment"
    ) {
      return <Error err={err} />;
    }
    return (
      <div id="commentPage">
        <div id="sortAndComment">
          Sort Comments By:
          <select onChange={this.filterBy} value={sortBy}>
            <option value="created_at">Created At </option>
            <option value="votes">Vote Count</option>
          </select>
          {err &&
          err.errMessage ===
            "Sorry you cannot post a comment right now please try again later. If you are signed in as 'guest' you cannot comment" ? (
            <div id="NoUser">
              <h6>{err.errMessage}</h6>
            </div>
          ) : loggedInUser ? (
            <PostComment
              postComment={this.postComment}
              loggedInUser={loggedInUser}
              article_id={article_id}
            />
          ) : (
            <div id="NoUser">
              <h6>Please Log In To Comment And Vote</h6>
            </div>
          )}
        </div>
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
        <button onClick={() => this.changePage(-1)}>Last Page</button>
        <button onClick={() => this.changePage(1)}>Next Page</button>
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
          "Sorry you cannot post a comment right now please try again later. If you are signed in as 'guest' you cannot comment";
        const err = { errMessage };
        this.setState({ err });
      });
  };
  filterBy = event => {
    this.setState({ sortBy: event.target.value });
  };
  changePage = direction => {
    this.setState(prevState => {
      return { page: prevState.page + direction };
    });
  };
}
