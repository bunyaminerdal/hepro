import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import ProjectMain from "../components/ProjectMain";
import { Container } from "reactstrap";

class projectMainPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, project } = this.props.auth;
    if (isAuthenticated !== null) {
      if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
    }
    return (
      <Container>
        <div>project: {project ? project : null}</div>
        <ProjectMain></ProjectMain>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(projectMainPage);
