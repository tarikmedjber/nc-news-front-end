import React from "react";
import { Link } from "@reach/router";
import "./articles.css";
import { ListGroup } from "react-bootstrap";
export default function ArticleList(props) {
  return props.articles.map((article, i) => {
    return (
      <div key={i} className="articleCard">
        <ListGroup key={article.article_id}>
          <Link to={`${article.article_id}`}>
            <ListGroup.Item variant="primary">{article.title}</ListGroup.Item>
          </Link>

          <ListGroup.Item>{`Created by ${article.author}  `}</ListGroup.Item>

          <ListGroup.Item>{`${article.votes} votes`}</ListGroup.Item>

          <Link to={`/articles/${article.article_id}/comments`}>
            {`${article.comment_count} comments`}
          </Link>

          <ListGroup.Item id="CreatedAt">{article.created_at}</ListGroup.Item>
        </ListGroup>
      </div>
    );
  });
}

//extract the div out and create a new page of single article and call that new page here
