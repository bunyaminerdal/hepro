import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { connect } from "react-redux";
import { editProject,projectEdited } from "../actions/projectActions";
import PropTypes from "prop-types";

class ProjectEditModal extends Component {
  state = {
    id: "",
    modal: true,
    name: "",
    description: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    projectediting: PropTypes.bool,
  };

  toggle = () => {    
    this.props.projectEdited();
    
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const editingProject = {
      id: this.props.selectedproject._id,      
      name: this.props.selectedproject.name,
      description: this.props.selectedproject.description,
    };

    //add item via add item action
    this.props.editProject(this.props.selectedproject._id,editingProject);

    this.toggle();
  };

  render() {
    const {projectediting, selectedproject} = this.props.project;
    
    return (
      
      <div>
        
        <Modal isOpen={projectediting} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="project">Project Name</Label>
                {selectedproject?(
                <Input
                  type="text"
                  name="name"
                  id="project"
                  placeholder="name..."
                  onChange={this.onChange}
                  value={selectedproject.name}
                  
                /> 
                ) : null}
                
                <Label for="project">Description</Label>
                {selectedproject?(
                <Input
                  type="text"
                  name="description"
                  id="project"
                  placeholder="Add a description..."
                  onChange={this.onChange}
                  value={selectedproject.description}
                />
                ) : null}
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Edit Project
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project,
  ownerId: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated, 
  selectedproject: state.project.selectedproject,
});

export default connect(mapStateToProps, { editProject,projectEdited })(ProjectEditModal);
