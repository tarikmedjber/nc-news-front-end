import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "@reach/router";
import "./articles.css";

export default function ArticleCard(props) {
  const { article } = props;
  let date = article.created_at
    .slice(0, 10)
    .split("-")
    .reverse()
    .join()
    .replace(/,/g, "-");
  return (
    <Card className="sections">
      <Link to={`/articles/${article.article_id}`} className="link">
        <Card.Title className="card-header">{article.title}</Card.Title>
      </Link>
      <div className="articlecardbody">
        <Link to={`/users/${article.author}`} className="link">
          <Card.Body>{`Created by ${article.author} on ${date}`}</Card.Body>
        </Link>
        <Card.Body>{`${article.votes} votes`}</Card.Body>

        <Card.Body>
          <Link to={`/articles/${article.article_id}`} className="link">
            {`${article.comment_count} comments`}
          </Link>
        </Card.Body>
      </div>
    </Card>
  );
}
