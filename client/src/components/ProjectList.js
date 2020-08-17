import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getProjects, deleteProject } from "../actions/projectActions";
import PropTypes from "prop-types";

class ProjectList extends Component {
  static propTypes = {
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
        {this.props.isAuthenticated ? (
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
                    {name} | {description}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        ) : null}
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
})(ProjectList);
