import React, { Component } from "react";
import { getArticleById } from "../Api";

export default class SingleArticle extends Component {
  state = { article: null };

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article: article });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      getArticleById(this.props.article_id)
        .then(article => {
          this.setState({ article: article });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const { article } = this.state;
    return (
      article && (
        <div className="Article">
          <h2>{article.title}</h2>
          <h3>{article.topic}</h3>
          <h3>{article.body}</h3>
          <h4>{article.votes}</h4>
          <h4>{article.comment_count}</h4>

          {/* <button onClick={this.deleteStudents}>Delete Student</button> */}
        </div>
      )
    );
  }
}
