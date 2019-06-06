import React, { Component } from "react";
import ArticleList from "./ArticleList";

import { getArticles, updateArticleVotes } from "../Api";
export default class ArticlesPage extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    getArticles().then(articles => {
      this.setState({ articles: articles });
    });
  }

  render() {
    const { articles } = this.state;

    return (
      <div>
        <h2>Articles</h2>
        <button onClick={() => this.sortBy("created_at")}>
          Filter by date created
        </button>
        <button onClick={() => this.sortBy("comment_count")}>
          Filter by comment count
        </button>
        <button onClick={() => this.sortBy("votes")}>
          Filter by vote count
        </button>

        <ul id="Article">
          <ArticleList
            handleVoteChange={this.handleVoteChange}
            articles={articles}
          />
        </ul>
      </div>
    );
  }

  sortBy(searchTerm) {
    if (this.state.orderBy === "desc") {
      getArticles({ sort_by: searchTerm }).then(articles => {
        this.setState({ articles: articles });
      });
    } else
      getArticles({ sort_by: searchTerm, order: this.state.orderBy }).then(
        articles => {
          this.setState({ articles: articles });
        }
      );
  }
  // handleVoteChange = event => {
  //   event.preventDefault();
  //   let direction = { votes: 1 };
  //   updateArticleVotes(article.article_id, direction).then(res => {
  //     return res;
  //   });
  // };
}
