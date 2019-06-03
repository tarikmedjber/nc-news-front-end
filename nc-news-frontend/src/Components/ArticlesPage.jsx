import React, { Component } from "react";
import axios from "axios";
export default class ArticlesPage extends Component {
  state = {
    articles: []
  };
  componentDidMount() {
    const url = "https://nc-news-web.herokuapp.com/api/articles";
    axios.get(url).then(({ data: { articles } }) => {
      this.setState({ articles: articles });
    });
  }
  render() {
    const { articles } = this.state;
    console.log(articles);
    return (
      <div>
        <h2>Articles</h2>
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                <h3>{article.title}</h3>
                <h4>{`Created by ${article.author}`}</h4>
                {`${article.comment_count} comments`}
                {` ${article.votes} votes`}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
