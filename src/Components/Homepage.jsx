import React, { Component } from "react";
import { getArticles } from "../Api";
import ArticleList from "./ArticleList";
import Error from "./Error";
import "./articles.css";

export default class Homepage extends Component {
  state = { articlesByVotes: [], articlesByComments: [], err: null };
  componentDidMount() {
    let topArticlesByVotes = getArticles({
      sort_by: "votes",
      order: "desc",
      limit: 3
    }).then(articlesAndVotes => {
      return articlesAndVotes;
    });
    let topArticlesByComments = getArticles({
      sort_by: "comment_count",
      order: "desc",
      limit: 3
    }).then(articlesAndComments => {
      return articlesAndComments;
    });
    let promises = Promise.all([topArticlesByVotes, topArticlesByComments]);
    promises
      .then(articles => {
        this.setState({
          articlesByVotes: articles[0],
          articlesByComments: articles[1]
        });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        this.setState({ err });
      });
  }
  render() {
    const { articlesByVotes, articlesByComments, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      <div>
        <h2>Todays Top Three's!</h2>
        <h3 className="mostVotes">Most Votes!</h3>

        <ul id="Article">
          <ArticleList articles={articlesByVotes} />
        </ul>

        <h3 className="mostComments">Most Comments!</h3>

        <ul id="Article">
          <ArticleList articles={articlesByComments} />
        </ul>
      </div>
    );
  }
}
