import React, { Component } from "react";
import TopicsList from "./TopicsList";
import "./Topic.css";
import Error from "./Error";

import { getTopics } from "../Api";
export default class TopicsPage extends Component {
  state = {
    topics: []
  };
  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({ topics: topics });
      })
      .catch(({ response }) => {
        const errMessage = response.statusText;
        const errStatus = response.status;
        const err = { errMessage, errStatus };
        console.log(response, "resonse");
        this.setState({ err });
      });
  }
  render() {
    const { topics, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      <div>
        <h2>Topics</h2>
        <ul id="Topic">
          <TopicsList topics={topics} />
        </ul>
      </div>
    );
  }
}
