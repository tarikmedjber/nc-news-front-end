import React, { Component } from "react";
import { getArticleById } from "../Api";
import "./SingleArticle.css";
import { Link } from "@reach/router";

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
          <Link to={`/articles/${article.article_id}/comments`}>
            <h4>{`${article.comment_count} comments`}</h4>
          </Link>

          {/* <button onClick={this.deleteStudents}>Delete Student</button> */}
        </div>
      )
    );
  }
}
