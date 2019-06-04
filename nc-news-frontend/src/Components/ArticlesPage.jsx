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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.slug !== this.props.slug) {
      getArticles(this.props.slug).then(articles => {
        this.setState({ article: articles });
      });
    }
  }
  render() {
    const { articles } = this.state;
    return (
      <div>
        <h2>Articles</h2>
        <ul>
          <ArticleList articles={articles} />
        </ul>
      </div>
    );
  }
}
