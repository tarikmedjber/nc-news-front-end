import React, { Component } from "react";
import { getUser, getArticles } from "../Api";
export default class UserProfile extends Component {
  state = { user: null };

  componentDidMount() {
    getUser(this.props.username).then(user => {
      this.setState({ user: user });
    });
    getArticles({ user: this.props.username });
  }
  render() {
    const { user } = this.state;

    return (
      user && (
        <div>
          <h2>{`${user.username}`}</h2>
          <img src={user.avatar_url} alt="user avatar" />
          <h4>{`${user.username}s Articles`}</h4>
        </div>
      )
    );
  }
}
