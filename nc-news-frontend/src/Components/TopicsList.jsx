import React from "react";
import { Link } from "@reach/router";

export default function TopicsList(props) {
  return props.topics.map((topic, i) => {
    return (
      <div key={i}>
        <li key={i}>
          <Link to={`/topics/${topic.slug}/articles`}>
            <h3>{topic.slug}</h3>
          </Link>
          <h4> {topic.description}</h4>
        </li>
      </div>
    );
  });
}
