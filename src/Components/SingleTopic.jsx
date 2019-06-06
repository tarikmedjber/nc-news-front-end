import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";

export default class SingleTopic extends Component {
  state = { topic: [] };

  componentDidMount() {
    getArticles({ topic: this.props.slug }).then(articles => {
      this.setState({ topic: articles });
    });
  }

  render() {
    const { topic } = this.state;
    return (
      topic && (
        <div>
          <h1>{`All about ${this.props.slug}`}</h1>
          <button onClick={() => this.sortBy("created_at")}>
            Filter by date created
          </button>
          <button onClick={() => this.sortBy("comment_count")}>
            Filter by comment count
          </button>
          <button onClick={() => this.sortBy("votes")}>
            Filter by vote count
          </button>

          <ul>
            {topic.map(article => {
              return (
                <li key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    <h2>{article.title}</h2>
                  </Link>
                  <h3>{article.body}</h3>
                  <h4>{`${article.votes} votes`}</h4>
                  <Link to={`/articles/${article.article_id}/comments`}>
                    <h4>{`${article.comment_count} comments`}</h4>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )
    );
  }

  sortBy(searchTerm) {
    getArticles({ topic: this.props.slug, sort_by: searchTerm }).then(
      articles => {
        this.setState({ topic: articles });
      }
    );
  }
}