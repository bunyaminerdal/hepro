import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  getProjects,
  deleteProject,
  projectEditing,
  projectAdding,
} from "../../actions/projectActions";
import { deleteDm } from "../../actions/dmActions";
import { deleteAlt } from "../../actions/alternativeActions";
import { deleteCrit } from "../../actions/criteriaActions";
import { deleteVal } from "../../actions/valueActions";
import { selectedProject } from "../../actions/authActions";
import PropTypes from "prop-types";
import ProjectEditForm from "./ProjectEditForm";
import ProjectListGroup from "./ProjectListGroup";
import ProjectAddForm from "./ProjectAddForm";
import Spinner from "reactstrap/lib/Spinner";
import Row from "reactstrap/lib/Row";

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
    this.props.value.vals.forEach((val) => {
      if (val.ownerId === id) {
        this.props.deleteVal(val._id);
      }
    });
    this.props.dm.dms.forEach((dm) => {
      if (dm.ownerId === id) {
        this.props.deleteDm(dm._id);
      }
    });
    this.props.alternative.alts.forEach((alt) => {
      if (alt.ownerId === id) {
        this.props.deleteAlt(alt._id);
      }
    });
    this.props.criteria.crits.forEach((crit) => {
      if (crit.ownerId === id) {
        this.props.deleteCrit(crit._id);
      }
    });
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
    const {
      projects,
      projectediting,
      selectedproject,
      projectadding,
      loading,
    } = this.props.project;
    return (
      <Container>
        {loading ? (
          <Row className="mt-3">
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <h3 className="ml-3">Loading...</h3>
          </Row>
        ) : (
          <ListGroup className="mt-3">
            <Button
              color="dark"
              //style={{ marginBottom: "2rem" }}
              onClick={this.onAddClick.bind(this)}
              block
            >
              Add Project
            </Button>
            {projectadding ? (
              <ListGroupItem>
                <ProjectAddForm />
              </ListGroupItem>
            ) : null}

            {projects.map((project) => (
              <ListGroupItem key={project._id}>
                {projectediting && selectedproject._id === project._id ? (
                  <ProjectEditForm project={project} />
                ) : (
                  <ProjectListGroup
                    project={project}
                    onDeleteClick={this.onDeleteClick}
                    onEditClick={this.onEditClick}
                    onSelectClick={this.onSelectClick}
                  />
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  project: state.project,
  dm: state.dm,
  alternative: state.alternative,
  criteria: state.criteria,
  value: state.value,
});

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  selectedProject,
  projectEditing,
  projectAdding,
  deleteDm,
  deleteAlt,
  deleteCrit,
  deleteVal,
})(ProjectList);
