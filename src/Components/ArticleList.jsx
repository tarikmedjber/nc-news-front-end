import React from "react";
import { Link } from "@reach/router";
import "./articles.css";
export default function ArticleList(props) {
  return props.articles.map((article, i) => {
    return (
      <div key={i}>
        <li key={article.article_id}>
          <Link to={`${article.article_id}`}>
            <h3>{article.title}</h3>
          </Link>

          <h4>{`Created by ${article.author}  `}</h4>
          <div className="ArticleVotes">
            <span className="VoteButton" role="img" aria-label="upHand">
              ☝︎
            </span>

            <p>{article.votes}</p>
            <span className="VoteButton" role="img" aria-label="downHand">
              ☟
            </span>
          </div>

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
