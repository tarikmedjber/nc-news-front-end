import React, { Component } from "react";
import { getComments } from "../Api";
import "./Comments.css";
export default class Comments extends Component {
  state = { comments: [] };
  componentDidMount() {
    getComments(this.props.article_id).then(comments => {
      this.setState({ comments: comments });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      getComments(this.props.article_id).then(comments => {
        this.setState({ comments: comments });
      });
    }
  }
  render() {
    const { comments } = this.state;
    return (
      <div>
        {comments.map(comment => {
          return (
            <li id="Comment" key={comment.comment_id}>
              <h3>{comment.author}:</h3>
              <p>{comment.body}</p>
              <p>{`${comment.votes} votes`}</p>
            </li>
          );
        })}
      </div>
    );
  }
}
