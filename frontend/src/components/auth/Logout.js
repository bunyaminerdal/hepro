import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { unLoadProjects } from "../../actions/projectActions";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    unLoadProjects: PropTypes.func.isRequired,
  };
  handleClick() {
    this.props.unLoadProjects();
    this.props.logout();
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.handleClick.bind(this)} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout, unLoadProjects })(Logout);
