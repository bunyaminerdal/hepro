import React, { Component } from "react";
import ProjectList from "../components/ProjectList";
import DmList from "../components/DmList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ProjectPage extends Component {
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
      <div>
        {isAuthenticated && project === null ? (
          <div>
            <ProjectList />
          </div>
        ) : null}
        {isAuthenticated && project !== null ? (
          <div>
            <DmList />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProjectPage);
