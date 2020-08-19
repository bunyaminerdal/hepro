import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

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
    return <div>project: {project ? project.name : null}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(projectMainPage);
