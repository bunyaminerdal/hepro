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
import { addProject } from "../actions/projectActions";
import PropTypes from "prop-types";

class ProjectModal extends Component {
  state = {
    ownerId: "",
    modal: false,
    name: "",
    description: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      ownerId: "",
      name: "",
      description: "",
    });
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      ownerId: this.state.ownerId,
      name: this.state.name,
      description: this.state.description,
    };

    //add item via add item action
    this.props.addProject(newProject);

    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Project
          </Button>
        ) : (
          <h1>Projects</h1>
        )}
        {/* {this.setState({ ownerId: this.props.auth.user })} */}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Project List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="project">Project Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="project"
                  placeholder="name..."
                  onChange={this.onChange}
                />
                <Label for="project">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="project"
                  placeholder="Add a description..."
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Project
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
});

export default connect(mapStateToProps, { addProject })(ProjectModal);
