import React, { Component } from "react";
import { getArticles } from "../Api";
import { Link } from "@reach/router";
import Error from "./Error";

import "./articles.css";

export default class Homepage extends Component {
  state = { articles: [], err: null };
  componentDidMount() {
    getArticles({ sort_by: "votes", limit: 2 })
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
  render() {
    const { articles, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      <div>
        <h2>Todays Top Two!</h2>
        <ul id="Article">
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h3>{article.title}</h3>
                </Link>

                <h4>{`Created by ${article.author}  `}</h4>

                <p>{`${article.votes} votes`}</p>

                <Link to={`/articles/${article.article_id}/comments`}>
                  {`${article.comment_count} comments`}
                </Link>

                <p id="CreatedAt">{article.created_at}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
