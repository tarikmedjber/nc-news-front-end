import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";
import Error from "./Error";

import "./articles.css";
import { ListGroup } from "react-bootstrap";

export default class Homepage extends Component {
  state = { articlesByVotes: [], articlesByComments: [], err: null };
  componentDidMount() {
    getArticles({ sort_by: "votes", limit: 2 })
      .then(articles => {
        this.setState({ articlesByVotes: articles });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });

    getArticles({ sort_by: "comment_count", limit: 2 })
      .then(articles => {
        this.setState({ articlesByComments: articles });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });
  }
  render() {
    const { articlesByVotes, articlesByComments, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      <div>
        <h2>Todays Top Two's!</h2>
        <h3 className="mostVotes">Most Votes!</h3>

        <ul id="Article">
          {articlesByVotes.map(article => {
            return (
              <ListGroup key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <ListGroup.Item variant="primary">
                    {article.title}
                  </ListGroup.Item>
                </Link>

                <ListGroup.Item>
                  {`Created by ${article.author}  `}{" "}
                </ListGroup.Item>

                <ListGroup.Item>{`${article.votes} votes`} </ListGroup.Item>

                <Link to={`/articles/${article.article_id}/comments`}>
                  {`${article.comment_count} comments`}
                </Link>

                <ListGroup.Item id="CreatedAt">
                  {article.created_at}{" "}
                </ListGroup.Item>
              </ListGroup>
            );
          })}
        </ul>

        <h3 className="mostComments">Most Comments!</h3>

        <ul id="Article">
          {articlesByComments.map(article => {
            return (
              <ListGroup key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <ListGroup.Item variant="primary">
                    {article.title}
                  </ListGroup.Item>
                </Link>

                <ListGroup.Item>
                  {`Created by ${article.author}  `}{" "}
                </ListGroup.Item>

                <ListGroup.Item>{`${article.votes} votes`} </ListGroup.Item>

                <Link to={`/articles/${article.article_id}/comments`}>
                  {`${article.comment_count} comments`}
                </Link>

                <ListGroup.Item id="CreatedAt">
                  {article.created_at}{" "}
                </ListGroup.Item>
              </ListGroup>
            );
          })}
        </ul>
      </div>
    );
  }
}
