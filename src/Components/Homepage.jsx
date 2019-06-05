import React, { Component } from "react";
import { getArticles } from "../Api";
import ArticleList from "./ArticleList";
import "./articles.css";

export default class Homepage extends Component {
  state = { articles: [] };
  componentDidMount() {
    getArticles({ sort_by: "votes", limit: 2 }).then(articles => {
      this.setState({ articles: articles });
    });
  }
  render() {
    return (
      <div>
        <h2>Todays Top Two!</h2>
        <ul id="Article">
          <ArticleList articles={this.state.articles} />
        </ul>
      </div>
    );
  }
}
