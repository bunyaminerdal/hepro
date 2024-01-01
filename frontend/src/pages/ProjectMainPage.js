import React, { Component } from "react";
import ProjectMain from "../components/ProjectMain";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ProjectMainPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

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
            <ProjectMain projectId={this.props.match.params.id} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProjectMainPage);
