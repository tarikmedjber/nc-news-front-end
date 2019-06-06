import React, { Component } from "react";
import ArticleList from "./ArticleList";
import Error from "./Error";

import { getArticles } from "../Api";
export default class ArticlesPage extends Component {
  state = {
    articles: [],
    sortBy: "created_at",
    err: null
  };
  componentDidMount() {
    getArticles()
      .then(articles => {
        this.setState({ articles: articles });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      getArticles({ sort_by: this.state.sortBy }).then(articles => {
        this.setState({ articles: articles });
      });
    }
  }

  render() {
    const { articles, err } = this.state;
    if (err) return <Error err={err} />;

    return (
      <div>
        <h2>Articles</h2>
        Sort By:
        <select onChange={this.sortBy} value={this.state.sortBy}>
          <option value="created_at">Created At </option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Vote Count</option>
        </select>
        <ul id="Article">
          <ArticleList
            handleVoteChange={this.handleVoteChange}
            articles={articles}
          />
        </ul>
      </div>
    );
  }

  sortBy = event => {
    this.setState({ sortBy: event.target.value });
  };
}
