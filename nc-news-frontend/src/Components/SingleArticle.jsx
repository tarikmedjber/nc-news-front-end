import React, { Component } from "react";
import { getArticleById } from "../Api";
import "./SingleArticle.css";
import { Link } from "@reach/router";
import Comments from "./Comments";

export default class SingleArticle extends Component {
  state = { article: null };

  componentDidMount() {
    getArticleById(this.props.article_id).then(article => {
      this.setState({ article: article });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      getArticleById(this.props.article_id).then(article => {
        this.setState({ article: article });
      });
    }
  }

  render() {
    const { article } = this.state;
    return (
      article && (
        <div>
          <h2>{article.title}</h2>
          <Link to={`/topics`}>
            <h3>{`Topic: ${article.topic}`}</h3>
          </Link>
          <h3>{article.body}</h3>
          <h4>{`${article.votes} votes`}</h4>
          <Comments
            article_id={article.article_id}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
      )
    );
  }
}
