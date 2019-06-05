import React, { Component } from "react";
import ArticleList from "./ArticleList";

import { getArticles } from "../Api";
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
        <button onClick={() => this.sortBy("date_created")}>
          Filter by date created
        </button>
        <button onClick={() => this.sortBy("comment_count")}>
          Filter by comment count
        </button>
        <button onClick={() => this.sortBy("votes")}>
          Filter by vote count
        </button>

        <ul id="Article">
          <ArticleList articles={articles} />
        </ul>
      </div>
    );
  }
  sortBy(searchTerm) {
    this.setState(prevState => {
      return {
        articles: [...prevState.articles].sort(
          (a, b) => a[searchTerm] - b[searchTerm]
        )
      };
    });
  }
}
