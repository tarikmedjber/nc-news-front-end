import React from "react";
import { Link } from "@reach/router";
import "./articles.css";
import { SplitButton, MenuItem } from "react-bootstrap";
export default function ArticleList(props) {
  return props.articles.map((article, i) => {
    return (
      <div key={i}>
        <li key={article.article_id} className="articleCard">
          <Link to={`${article.article_id}`}>
            <h3>{article.title}</h3>
          </Link>

          <h4>{`Created by ${article.author}  `}</h4>

          <p>{`${article.votes} votes`}</p>

          <Link to={`/articles/${article.article_id}/comments`}>
            {`${article.comment_count} comments`}
          </Link>

          <p id="CreatedAt">{article.created_at}</p>
        </li>
      </div>
    );
  });
}

//extract the div out and create a new page of single article and call that new page here
