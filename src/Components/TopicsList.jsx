import React from "react";
import { Link } from "@reach/router";
import { ListGroup } from "react-bootstrap";

export default function TopicsList(props) {
  const { topics } = props;
  return topics.map(topic => {
    return (
      <div key={topic.slug}>
        <ListGroup className="sections">
          <Link to={`/topics/${topic.slug}/articles`}>
            <ListGroup.Item variant="info">{topic.slug}</ListGroup.Item>
          </Link>
          <ListGroup.Item variant="warning">{topic.description}</ListGroup.Item>
        </ListGroup>
      </div>
    );
  });
}
