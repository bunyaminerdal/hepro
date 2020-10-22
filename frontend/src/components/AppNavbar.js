import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deselectProject } from "../actions/authActions";
import { logout } from "../actions/authActions";
import { unLoadProjects } from "../actions/projectActions";
import { unLoadDms } from "../actions/dmActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };
  handleClick() {
    this.props.unLoadProjects();
    this.props.unLoadDms();
    this.props.logout();
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    unLoadProjects: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isAuthenticated ? (
                <NavbarText>
                  <Link
                    color="dark"
                    
                    to="/project"
                    onClick={() => {
                      this.props.deselectProject();
                      this.props.unLoadDms();
                    }}
                  >
                    My projects
                  </Link>
                </NavbarText>
              ) : null}
            </Nav>
            <Nav navbar>
              {isAuthenticated ? (
                <NavbarText className="mr-2">
                  Welcome, {user.name} |{" "}
                </NavbarText>
              ) : null}
              {isAuthenticated ? (
                <NavbarText>
                  <Link to="#" onClick={this.handleClick.bind(this)}> Sign out </Link>
                </NavbarText>
              ) : null}
              {!isAuthenticated ? (
                <NavbarText className="mr-2">
                  <Link to="/signin"> Sign in |</Link>
                </NavbarText>
              ) : null}
              {!isAuthenticated ? (
                <NavbarText>
                  <Link to="/signup"> Sign up </Link>
                </NavbarText>
              ) : null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
  unLoadProjects,
  unLoadDms,
  deselectProject,

})(AppNavbar);
