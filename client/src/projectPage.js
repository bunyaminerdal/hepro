import React, { Component } from "react";
import ProjectList from "./components/ProjectList";
import ItemModal from "./components/itemModal";
import ProjectModal from "./components/projectModal";
import { Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class ProjectPage extends Component {
  render() {
    return (
      <Container>
        <ItemModal />
        <ProjectModal />
        <ProjectList />
      </Container>
    );
  }
}

export default ProjectPage;
