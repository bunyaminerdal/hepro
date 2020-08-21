import React, { Component } from "react";
import ProjectList from "../components/ProjectList";
import ProjectModal from "../components/projectModal";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class ProjectPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated !== null) {
      if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
    }

    return (
      <Container>
        {isAuthenticated ? (
          <div>
            <ProjectModal />
            <ProjectList />
          </div>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProjectPage);
