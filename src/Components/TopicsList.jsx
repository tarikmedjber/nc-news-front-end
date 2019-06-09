import React from "react";
import { Link } from "@reach/router";
import { ListGroup } from "react-bootstrap";

export default function TopicsList(props) {
  const { topics } = props;
  return topics.map(topic => {
    return (
      <div key={topic.slug}>
        <ListGroup>
          <Link to={`/topics/${topic.slug}/articles`}>
            <ListGroup.Item variant="primary">{topic.slug}</ListGroup.Item>
          </Link>
          <ListGroup.Item> {topic.description}</ListGroup.Item>
        </ListGroup>
      </div>
    );
  });
}
