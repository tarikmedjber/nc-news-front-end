import React from "react";
import { Link } from "@reach/router";
import { ListGroup } from "react-bootstrap";

export default function TopicsList(props) {
  return props.topics.map((topic, i) => {
    return (
      <div key={i}>
        <ListGroup key={i}>
          <Link to={`/topics/${topic.slug}/articles`}>
            <ListGroup.Item variant="primary">{topic.slug}</ListGroup.Item>
          </Link>
          <ListGroup.Item> {topic.description}</ListGroup.Item>
        </ListGroup>
      </div>
    );
  });
}
