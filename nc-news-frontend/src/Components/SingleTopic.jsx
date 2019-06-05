import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";

export default class SingleTopic extends Component {
  state = { topic: [], orderBy: "descending" };

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
          <button onClick={() => this.sortBy("date_created")}>
            Filter by date created
          </button>
          <button onClick={() => this.sortBy("comment_count")}>
            Filter by comment count
          </button>
          <button onClick={() => this.sortBy("votes")}>
            Filter by vote count
          </button>
          <button onClick={this.orderByAscending}>Ascending</button>
          <button onClick={this.orderByDescending}>Descending</button>

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
    if (this.state.orderBy === "descending") {
      this.setState(prevState => {
        return {
          topic: [...prevState.topic].sort(
            (a, b) => a[searchTerm] - b[searchTerm]
          )
        };
      });
    } else if (this.state.orderBy === "acsending") {
      this.setState(prevState => {
        return {
          topic: [...prevState.topic].sort(
            (a, b) => b[searchTerm] - a[searchTerm]
          )
        };
      });
    }
  }
  orderByAscending = () => {
    this.setState({ orderBy: "ascending" });
  };

  orderByDescending = () => {
    this.setState({ orderBy: "descending" });
  };
}
