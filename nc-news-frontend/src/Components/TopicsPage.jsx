import React, { Component } from "react";
import TopicsList from "./TopicsList";

import { getTopics } from "../Api";
export default class TopicsPage extends Component {
  state = {
    topics: []
  };
  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics: topics });
    });
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <TopicsList topics={topics} />
        </ul>
      </div>
    );
  }
}
