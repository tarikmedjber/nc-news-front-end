import React, { Component } from "react";
import ArticleList from "./ArticleList";
import Error from "./Error";
import "./articles.css";
import { getArticles } from "../Api";
export default class ArticlesPage extends Component {
  state = {
    articles: [],
    sortBy: "created_at",
    err: null,
    page: 1,
    total_count: null
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
      getArticles({ sort_by: this.state.sortBy })
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
    } else if (prevState.page !== this.state.page) {
      getArticles({ p: this.state.page }).then(articles => {
        this.setState(articles);
      });
    }
  }

  render() {
    const { articles, sortBy, err, total_count } = this.state;
    if (err) return <Error err={err} />;
    const maxPages = Math.ceil(total_count / 10);
    const totalButtons = Array.from({ length: maxPages });

    return (
      <div className="articlesPage">
        <h2>Articles</h2>
        <div className="sortBy">
          Sort By:
          <select onChange={this.filterBy} value={sortBy}>
            <option value="created_at">Created At </option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Vote Count</option>
          </select>
        </div>

        <div>
          {/* Page: <button onClick={this.changePage}>{page}</button> */}
        </div>
        <ul className="Article">
          <ArticleList
            handleVoteChange={this.handleVoteChange}
            articles={articles}
          />
        </ul>
        <button onClick={() => this.changePage(1)}>{totalButtons} </button>
      </div>
    );
  }

  filterBy = event => {
    this.setState({ sortBy: event.target.value });
  };
  changePage = direction => {
    this.setState(prevState => {
      return { page: prevState.page + direction };
    });
  };
}
