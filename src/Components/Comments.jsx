import React, { Component } from "react";
import { getComments, postComment, deleteComment } from "../Api";
import "./Comments.css";
import SingleComment from "./SingleComment";
import Error from "./Error";
import { Button } from "react-bootstrap";

export default class Comments extends Component {
  state = {
    comments: [],
    userComment: "",
    disableButton: true,
    err: null,
    page: 1,
    total_count: null
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
    } else if (prevState.page !== this.state.page) {
      getComments({ p: this.state.page }).then(({ comments, total_count }) => {
        this.setState({ comments, total_count });
      });
    }
  }

  render() {
    const { comments, userComment, err, total_count } = this.state;

    const maxPages = Math.ceil(total_count / 10);
    const totalButtons = Array.from({ length: maxPages });
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
                  loggedInUser={this.props.loggedInUser}
                />
              );
            })}
        </ul>
        <button onClick={() => this.changePage(1)}>{totalButtons} </button>
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
  handleOnChange = event => {
    this.setState({ userComment: event.target.value });
  };
  postComment = event => {
    event.preventDefault();
    let newComment = {
      username: this.props.loggedInUser,
      body: this.state.userComment
    };
    postComment(this.props.article_id, newComment)
      .then(comment => {
        this.setState(prevState => {
          return { comments: [comment, ...prevState.comments] };
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
  changePage = direction => {
    this.setState(prevState => {
      return { page: prevState.page + direction };
    });
  };
}
