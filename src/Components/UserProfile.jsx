import React, { Component } from "react";
import { getUser, getArticles } from "../Api";
import ArticleList from "./ArticleList";
import DropDownSortBy from "./DropDownSortBy";
import Error from "./Error";
import "./UserProfile.css";

export default class UserProfile extends Component {
  state = {
    user: null,
    articles: [],
    sortBy: "created_at",
    err: null,
    page: 1
  };

  componentDidMount() {
    getUser(this.props.username).then(user => {
      this.setState({ user: user });
    });
    getArticles({ author: this.props.username }).then(({ articles }) => {
      this.setState({ articles: articles });
    });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      getArticles({ sort_by: this.state.sortBy, user: this.props.username })
        .then(({ articles }) => {
          this.setState({ articles: articles });
        })
        .catch(({ response }) => {
          const errMessage = response.statusText;
          const errStatus = response.status;
          const err = { errMessage, errStatus };
          this.setState({ err });
        });
    }
    if (prevState.page !== this.state.page) {
      getArticles({ p: this.state.page }).then(({ articles }) => {
        this.setState({ articles: articles });
      });
    }
  }
  render() {
    const { user, articles, sortBy, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      user && (
        <div>
          <h2>{`${user.username}`}</h2>
          <img id="usersPic" src={user.avatar_url} alt="user avatar" />
          <h4>{`${user.username}s Articles:`}</h4>
          <div className="sortBy">
            Sort By:
            <DropDownSortBy sortByFunc={this.sortByFunc} sortBy={sortBy} />
          </div>
          <ul className="Article">
            <ArticleList
              handleVoteChange={this.handleVoteChange}
              articles={articles}
            />
          </ul>
        </div>
      )
    );
  }
  sortByFunc = event => {
    this.setState({ sortBy: event.target.value });
  };
  changePage = direction => {
    this.setState(prevState => {
      return { page: prevState.page + direction };
    });
  };
}
