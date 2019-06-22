import React, { Component } from "react";
import { getArticles } from "../Api";
import ArticleList from "./ArticleList";
import Error from "./Error";
import "./articles.css";
import { ClipLoader } from "react-spinners";

export default class Homepage extends Component {
  state = {
    articlesByVotes: [],
    articlesByComments: [],
    err: null,
    loading: true
  };
  componentDidMount() {
    let topArticlesByVotes = getArticles({
      sort_by: "votes",
      order: "desc",
      limit: 3
    }).then(({ articles: articlesAndVotes }) => {
      return articlesAndVotes;
    });
    let topArticlesByComments = getArticles({
      sort_by: "comment_count",
      order: "desc",
      limit: 3
    }).then(({ articles: articlesAndComments }) => {
      return articlesAndComments;
    });
    let promises = Promise.all([topArticlesByVotes, topArticlesByComments]);
    promises
      .then(articles => {
        this.setState({
          articlesByVotes: articles[0],
          articlesByComments: articles[1],
          loading: false
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
    const { articlesByVotes, articlesByComments, err, loading } = this.state;
    if (err) return <Error err={err} />;
    if (loading)
      return (
        <div className="sweet-loading">
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    return (
      <div className="Homepage">
        <h2>Todays Top Threes!</h2>
        <h3 className="mostVotes">Most Voted Articles!</h3>

        <ul id="Article">
          <ArticleList articles={articlesByVotes} />
        </ul>

        <h3 className="mostComments">Most Commented Articles!</h3>

        <ul id="Article">
          <ArticleList articles={articlesByComments} />
        </ul>
      </div>
    );
  }
}
