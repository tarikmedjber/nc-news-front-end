import React, { Component } from "react";
import { getComments } from "../Api";
export default class Comments extends Component {
  state = { comments: [] };
  componentDidMount() {
    getComments(this.props.article_id).then(comments => {
      this.setState({ comments: comments });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.comments !== this.state.comments) {
      getComments(this.props.article_id).then(comments => {
        this.setState({ comments: comments });
      });
    }
  }
  render() {
    const { comments } = this.state;

    return (
      <div>
        <p>HELLO!!!</p>
      </div>
    );
  }
}
