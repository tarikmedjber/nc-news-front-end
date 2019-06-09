import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class PostComment extends Component {
  state = { userComment: "" };
  render() {
    const { userComment } = this.state;
    let isAllFilledIn = userComment ? true : false;

    return (
      <form onSubmit={() => this.props.postComment(userComment)}>
        Comment:
        <input onChange={this.handleOnChange} />
        <Button
          variant="outline-secondary"
          disabled={!isAllFilledIn}
          onClick={() => this.props.postComment(userComment)}
        >
          Post Comment
        </Button>
      </form>
    );
  }
  handleOnChange = event => {
    this.setState({ userComment: event.target.value });
  };
}
