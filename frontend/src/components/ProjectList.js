import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getProjects, deleteProject,projectEditing,projectAdding } from "../actions/projectActions";
import { selectedProject } from "../actions/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProjectModal from "../components/projectModal";
import ProjectEditModal from "../components/ProjectEditModal";

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

  onEditClick = (id) => {    
    this.props.projectEditing(id);
  };
  onAddClick = () => {    
    this.props.projectAdding();
  };

  onSelectClick = (id) => {
    this.props.selectedProject(id);
  };

  render() {
    const { projects} = this.props.project;
    return (
      <Container>
        <ListGroup className="mt-3">
        <Button
            color="dark"
            //style={{ marginBottom: "2rem" }}
            onClick={this.onAddClick.bind(this)}
            block
          >
            Add Project
          </Button>
          <TransitionGroup>
          
            <ProjectModal  />
            <ProjectEditModal/>
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
                  <span>  </span>
                  <Button
                    className="edit-btn"
                    color="warning"
                    size="sm"
                    onClick={this.onEditClick.bind(this, _id)}
                  >
                    EDIT
                  </Button>
                  <Link to="#"
                    className="ml-3 mr-3"
                    onClick={this.onSelectClick.bind(this, _id)}
                  >
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
  projectEditing,
  projectAdding,
})(ProjectList);
