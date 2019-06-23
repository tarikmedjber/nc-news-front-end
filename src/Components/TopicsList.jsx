import React from "react";
import { NavDropdown } from "react-bootstrap";

export default function TopicsList(props) {
  const { topics } = props;
  return topics.map((topic, i) => {
    return (
      <NavDropdown.Item
        key={topic.slug}
        href={`/topics/${topic.slug}/articles`}
      >
        {topic.slug} <p>- {topic.description}</p>
      </NavDropdown.Item>
    );
  });
}
