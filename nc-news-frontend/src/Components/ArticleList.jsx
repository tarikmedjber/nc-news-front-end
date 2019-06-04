import React from "react";
import { Link } from "@reach/router";

export default function ArticleList(props) {
  return props.articles.map((article, i) => {
    return (
      <div key={i}>
        <li key={article.article_id}>
          <Link to={`${article.article_id}`}>
            <h3>{article.title}</h3>
          </Link>
          <h4>{`Created by ${article.author}`}</h4>
          {`${article.comment_count} comments`}
          {` ${article.votes} votes`}
        </li>
      </div>
    );
  });
}
