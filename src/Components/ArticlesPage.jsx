import React, { Component } from "react";
import ArticleList from "./ArticleList";
import Error from "./Error";
import "./articles.css";
import { getArticles } from "../Api";
import DropDownSortBy from "./DropDownSortBy";

export default class ArticlesPage extends Component {
  state = {
    articles: [],
    sortBy: "created_at",
    err: null,
    page: 1
  };
  componentDidMount() {
    getArticles()
      .then(({ articles, total_count }) => {
        this.setState({ articles: articles });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        this.setState({ err });
      });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      getArticles({ sort_by: this.state.sortBy })
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
      getArticles({ p: this.state.page }).then(({ articles, total_count }) => {
        this.setState({ articles: articles });
      });
    }
  }

  render() {
    const { articles, sortBy, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      <div className="articlesPage">
        <h2>Articles</h2>
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
        <button onClick={() => this.changePage(-1)}>Last Page</button>

        <button onClick={() => this.changePage(1)}>Next Page</button>
      </div>
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
