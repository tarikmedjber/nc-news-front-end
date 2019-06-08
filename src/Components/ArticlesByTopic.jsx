import React, { Component } from "react";
import { getArticles } from "../Api";
import Error from "./Error";
import "./Topic.css";
import ArticleList from "./ArticleList";

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
        console.log(response, "resonse");
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
          console.log(response, "resonse");
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
          <select onChange={this.sortBy} value={sortBy}>
            <option value="created_at">Created At </option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Vote Count</option>
          </select>
          <ul>
            <ArticleList articles={articles} />;
          </ul>
        </div>
      )
    );
  }

  sortBy = event => {
    this.setState({ sortBy: event.target.value });
  };
}
