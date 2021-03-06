import React, { Component } from "react";
import { getComments, postComment, deleteComment } from "../Api";
import "./Comments.css";
import SingleComment from "./SingleComment";
import Error from "./Error";
import PostComment from "./PostComment";
import { Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

export default class Comments extends Component {
  state = {
    comments: [],
    disableButton: true,
    sortBy: "created_at",
    err: null,
    page: 1,
    total_count: 0,
    loading: true
  };
  componentDidMount() {
    getComments(this.props.article_id, {})
      .then(comments => {
        this.setState({
          comments: comments,
          total_count: this.props.comment_count,
          loading: false
        });
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
    const { comments, err, sortBy, page, total_count, loading } = this.state;
    const { loggedInUser, article_id } = this.props;

    if (
      err &&
      err.errMessage !==
        "Sorry you cannot post a comment right now please try again later. If you are signed in as 'guest' you cannot comment"
    ) {
      return <Error err={err} />;
    }
    if (loading)
      return (
        <div className="sweet-loading">
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    const maxPages = Math.ceil(total_count / 10);
    const pageNav = Array.from({ length: maxPages }, (v, i) => i + 1);

    if (comments.length < 1)
      return (
        <div>
          <h3>No comments for this article, be the first!</h3>
        </div>
      );
    return (
      <Container>
        <Row className="justify-content-md-center">
          <div id="sortBy">
            Sort Comments By:
            <select onChange={this.filterBy} value={sortBy}>
              <option value="created_at">Created At </option>
              <option value="votes">Vote Count</option>
            </select>
          </div>
        </Row>
        <Row className="justify-content-md-center">
          {err &&
          err.errMessage ===
            "Sorry you cannot post a comment right now please try again later. If you are signed in as 'guest' you cannot comment" ? (
            <div className="NoUser">
              <h6>{err.errMessage}</h6>
            </div>
          ) : loggedInUser ? (
            <PostComment
              postComment={this.postComment}
              loggedInUser={loggedInUser}
              article_id={article_id}
            />
          ) : (
            <div className="NoUser">
              <h6>Please Log In To Comment And Vote</h6>
            </div>
          )}
        </Row>

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

        <ul className="pageNav">
          {pageNav.map((page, i) => {
            return (
              <li key={page} id="pageNumber">
                <button onClick={() => this.changePage(i + 1)}>{page}</button>
              </li>
            );
          })}
        </ul>
        <p>{`Page: ${page}`}</p>
      </Container>
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
    this.setState({ page: direction });
  };
}
