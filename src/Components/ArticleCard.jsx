import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "@reach/router";

export default function ArticleCard(props) {
  const { article } = props;
  return (
    <ListGroup>
      <Link to={`/articles/${article.article_id}`}>
        <ListGroup.Item variant="primary">{article.title}</ListGroup.Item>
      </Link>

      <ListGroup.Item>{`Created by ${article.author}  `}</ListGroup.Item>

      <ListGroup.Item>{`${article.votes} votes`}</ListGroup.Item>

      <Link to={`/articles/${article.article_id}/comments`}>
        {`${article.comment_count} comments`}
      </Link>

      <ListGroup.Item id="CreatedAt">{article.created_at}</ListGroup.Item>
    </ListGroup>
  );
}
