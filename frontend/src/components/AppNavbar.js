import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deselectProject } from "../actions/authActions";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { unLoadProjects } from "../actions/projectActions";

const { Header } = Layout;

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };
  handleClick() {
    this.props.unLoadProjects();
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
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            {isAuthenticated ? (
              <Menu.Item key="2">
                <Link
                  to="/project"
                  onClick={() => {
                    this.props.deselectProject();
                  }}
                ></Link>
                My projects
              </Menu.Item>
            ) : null}
            {isAuthenticated ? (
              <Menu.Item key="3">{user.name}</Menu.Item>
            ) : (
              <Menu.Item key="4">
                <Link to="/signup">Sign up</Link>
              </Menu.Item>
            )}
            {isAuthenticated ? (
              <Menu.Item key="5" onClick={this.handleClick.bind(this)}>
                Sign out
              </Menu.Item>
            ) : (
              <Menu.Item key="6">
                <Link to="/signin">Sign in</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
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
  deselectProject,
})(AppNavbar);
