import React, { Component } from "react";
import ProjectList from "../components/projectComponents/ProjectList";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deselectDm, deselectProject } from "../actions/authActions";
import { unLoadDms } from "../actions/dmActions";

class ProjectPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.props.deselectDm();
    this.props.unLoadDms();
    this.props.deselectProject();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    //burada isauth null geliyor böylece sayfa yenilenince direct redirect yapmıyor
    if (isAuthenticated !== null) {
      if (!isAuthenticated) {
        return <Redirect to="/" />;
      }
    }
    return (
      <div>
        {isAuthenticated ? (
          <div>
            <ProjectList />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deselectDm,
  unLoadDms,
  deselectProject,
})(ProjectPage);
