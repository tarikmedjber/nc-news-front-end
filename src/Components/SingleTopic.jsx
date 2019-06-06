import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";
import Error from "./Error";

export default class SingleTopic extends Component {
  state = { topic: [], sortBy: "created_at", err: null };

  componentDidMount() {
    getArticles({ topic: this.props.slug })
      .then(articles => {
        this.setState({ topic: articles });
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
      getArticles({ topic: this.props.slug, sort_by: this.state.sortBy }).then(
        articles => {
          this.setState({ topic: articles });
        }
      );
    }
  }

  render() {
    const { topic, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      topic && (
        <div>
          <h1>{`All about ${this.props.slug}`}</h1>
          Sort By:
          <select onChange={this.sortBy} value={this.state.sortBy}>
            <option value="created_at">Created At </option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Vote Count</option>
          </select>
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

  sortBy = event => {
    this.setState({ sortBy: event.target.value });
  };
}
