import React, { Component } from "react";
import ProjectList from "../components/ProjectList";
import DmList from "../components/DmList";
import ProjectModal from "../components/projectModal";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
    if (project) {
      console.log(project);
    }

    return (
      <Container fluid={true}>
        {isAuthenticated && project === null ? (
          <div>
            <ProjectModal />
            <ProjectList />
          </div>
        ) : (
          <div>
            <Row>
              <Col xs="3" fluid={false}>
                <DmList />
              </Col>
              <Col xs="9">Table</Col>
            </Row>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProjectPage);
