import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "@reach/router";
import "./articles.css";

export default function ArticleCard(props) {
  const { article } = props;
  return (
    <Card className="sections">
      <Link to={`/articles/${article.article_id}`}>
        <Card.Title className="card-header">{article.title}</Card.Title>
      </Link>
      <div className="articlecardbody">
        <Link to={`/users/${article.author}`}>
          <Card.Body>{`Created by ${article.author}`}</Card.Body>
        </Link>
        <Card.Body>{`${article.votes} votes`}</Card.Body>

        <Card.Body>
          <Link to={`/articles/${article.article_id}`}>
            {`${article.comment_count} comments`}
          </Link>
        </Card.Body>

        <Card.Body id="CreatedAt">{article.created_at.slice(0, 10)}</Card.Body>
      </div>
    </Card>
  );
}
