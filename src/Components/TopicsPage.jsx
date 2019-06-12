import React, { Component } from "react";
import TopicsList from "./TopicsList";
import "./Topic.css";
import Error from "./Error";
import { NavDropdown } from "react-bootstrap";

import { getTopics } from "../Api";
export default class TopicsPage extends Component {
  state = {
    topics: [],
    err: null
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
        this.setState({ err });
      });
  }

  render() {
    const { topics, err } = this.state;
    if (err) return <Error err={err} />;
    return (
      <NavDropdown title="Topics" id="nav-dropdown">
        <TopicsList topics={topics} />
      </NavDropdown>
    );
  }
}
