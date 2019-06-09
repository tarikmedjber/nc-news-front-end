import React, { Component } from "react";
import { getArticles } from "../Api";
import Error from "./Error";
import "./Topic.css";
import ArticleList from "./ArticleList";
import DropDownSortBy from "./DropDownSortBy";

export default class ArticlesByTopic extends Component {
  state = { articles: [], sortBy: "created_at", err: null };

  componentDidMount() {
    getArticles({ topic: this.props.slug })
      .then(articles => {
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
      getArticles({ topic: this.props.slug, sort_by: this.state.sortBy })
        .then(articles => {
          this.setState({ articles: articles });
        })
        .catch(({ response }) => {
          const errMessage = response.statusText;
          const errStatus = response.status;
          const err = { errMessage, errStatus };
          this.setState({ err });
        });
    }
  }

  render() {
    const { articles, sortBy, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      articles && (
        <div className="topicArticleList">
          <h1>{`All about ${this.props.slug}`}</h1>
          Sort By:
          <DropDownSortBy sortByFunc={this.sortByFunc} sortBy={sortBy} />
          <ul>
            <ArticleList articles={articles} />;
          </ul>
        </div>
      )
    );
  }

  sortByFunc = event => {
    this.setState({ sortBy: event.target.value });
  };
}