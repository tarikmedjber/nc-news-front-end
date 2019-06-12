import React from "react";
import { Link } from "@reach/router";
import { NavDropdown } from "react-bootstrap";

export default function TopicsList(props) {
  const { topics } = props;
  return topics.map((topic, i) => {
    return (
      <div key={topic.slug}>
        <NavDropdown.Item eventKey={i}>
          <Link to={`/topics/${topic.slug}/articles`}>
            {topic.slug} <p>- {topic.description}</p>
          </Link>
        </NavDropdown.Item>
      </div>
    );
  });
}
