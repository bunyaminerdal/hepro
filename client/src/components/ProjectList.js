import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../actions/projectActions";
import PropTypes from "prop-types";

class ProjectList extends Component {
  static propTypes = {
    getProjects: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    this.props.getProjects();
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
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
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name} | {description}
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
  project: state.project,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
})(ProjectList);
