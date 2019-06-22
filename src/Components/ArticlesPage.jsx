import React, { Component } from "react";
import ArticleList from "./ArticleList";
import Error from "./Error";
import "./articles.css";
import { getArticles } from "../Api";
import DropDownSortBy from "./DropDownSortBy";
import "./articles.css";
import { ClipLoader } from "react-spinners";

export default class ArticlesPage extends Component {
  state = {
    articles: [],
    sortBy: "created_at",
    err: null,
    page: 1,
    total_count: 0,
    loading: true
  };
  componentDidMount() {
    getArticles()
      .then(({ articles, total_count }) => {
        this.setState({
          articles: articles,
          total_count: total_count,
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
        this.setState({ articles: articles, total_count: total_count });
      });
    }
  }

  render() {
    const { articles, sortBy, err, total_count, page, loading } = this.state;
    if (err) return <Error err={err} />;
    if (loading)
      return (
        <div className="sweet-loading">
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={loading}
          />
        </div>
      );
    const maxPages = Math.ceil(total_count / 10);
    const pageNav = Array.from({ length: maxPages }, (v, i) => i + 1);
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

        <ul className="pageNav">
          {pageNav.map((page, i) => {
            return (
              <li key={i} id="pageNumber">
                <button onClick={() => this.changePage(i + 1)}>{page}</button>
              </li>
            );
          })}
        </ul>
        <p>{`Page: ${page}`}</p>
      </div>
    );
  }

  sortByFunc = event => {
    this.setState({ sortBy: event.target.value });
  };
  changePage = direction => {
    this.setState({ page: direction });
  };
}
