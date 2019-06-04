import React, { Component } from "react";
import ArticleList from "./ArticleList";
import { Router } from "@reach/router";
import SingleArticle from "./SingleArticle";
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
        <Router>
          <SingleArticle path="/:article_id" />
        </Router>
        <h2>Articles</h2>
        <ul>
          <ArticleList articles={articles} />
        </ul>
      </div>
    );
  }
}
