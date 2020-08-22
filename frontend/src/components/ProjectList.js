import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../actions/projectActions";
import { selectedProject, deselectProject } from "../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProjectList extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getProjects();
    }
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  onSelectClick = (id) => {
    this.props.selectedProject(id);
  };

  render() {
    const { projects } = this.props.project;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {projects.map(({ _id, name, description }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  <Link to="#" onClick={this.onSelectClick.bind(this, _id)}>
                    {name}
                  </Link>
                  | {description}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  selectedProject,
  deselectProject,
})(ProjectList);
