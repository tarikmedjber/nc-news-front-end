import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "@reach/router";
import "./articles.css";

export default function ArticleCard(props) {
  const { article } = props;
  return (
    <ListGroup className="sections">
      <Link to={`/articles/${article.article_id}`}>
        <ListGroup.Item variant="info">{article.title}</ListGroup.Item>
      </Link>

      <Link to={`/users/${article.author}`}>
        <ListGroup.Item variant="warning">{`Created by ${
          article.author
        }  `}</ListGroup.Item>
      </Link>
      <ListGroup.Item variant="warning">{`${
        article.votes
      } votes`}</ListGroup.Item>

      <ListGroup.Item variant="warning">
        <Link to={`/articles/${article.article_id}`}>
          {`${article.comment_count} comments`}
        </Link>
      </ListGroup.Item>

      <ListGroup.Item id="CreatedAt" variant="warning">
        {article.created_at.slice(0, 10)}
      </ListGroup.Item>
    </ListGroup>
  );
}
