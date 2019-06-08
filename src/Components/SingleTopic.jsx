import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";
import Error from "./Error";
import { ListGroup } from "react-bootstrap";
import "./Topic.css";

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
      getArticles({ topic: this.props.slug, sort_by: this.state.sortBy })
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
  }

  render() {
    const { topic, sortBy, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      topic && (
        <div className="topicArticleList">
          <h1>{`All about ${this.props.slug}`}</h1>
          Sort By:
          <select onChange={this.sortBy} value={sortBy}>
            <option value="created_at">Created At </option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Vote Count</option>
          </select>
          <ul>
            {topic.map(article => {
              return (
                <ListGroup key={article.article_id}>
                  <Link to={`/articles/${article.article_id}`}>
                    <ListGroup.Item variant="primary">
                      {article.title}
                    </ListGroup.Item>
                  </Link>
                  <ListGroup.Item>{article.body}</ListGroup.Item>
                  <ListGroup.Item>{`${article.votes} votes`}</ListGroup.Item>
                  <Link to={`/articles/${article.article_id}/comments`}>
                    <ListGroup.Item>{`${
                      article.comment_count
                    } comments`}</ListGroup.Item>
                  </Link>
                </ListGroup>
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
