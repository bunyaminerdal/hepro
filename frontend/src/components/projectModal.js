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
  Alert,
} from "reactstrap";

import { connect } from "react-redux";
import { addProject,projectAdded } from "../actions/projectActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class ProjectModal extends Component {
  state = {     
    name: "",
    description: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,    
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  toggle = () => {
    //clear errors
    this.props.clearErrors();    
    this.props.projectAdded();

  };
  onChange =  (e) => {
     this.setState({
      [e.target.name]: e.target.value,
    });
    
  };
  componentDidUpdate(prevProps, prevState) {
    if(this.props.project.projectadding){      
      
      if(prevProps!==this.props){
        this.setState({name:""})
      }
      if(prevProps!==this.props){
        this.setState({description:""})
      }

      if((this.state.msg && this.state.name) || (this.state.msg && this.state.description)){
        this.setState({msg: null})
      }
    }
    const { error } = this.props;
      if (error !== prevProps.error) {
        //check for register error
        if (error.id === "PROJECT_ADD_FAIL") {
          this.setState({ msg: error.msg.msg });
        } else {
          this.setState({ msg: null });
        }
      }

  }
  onSubmit = (e) => {
    e.preventDefault();

    const newProject = {      
      name: this.state.name,
      description: this.state.description,
    };

    //add item via add item action
    this.props.addProject(newProject);
    
  };

  render() {
    const {projectadding} = this.props.project;
    return (
      <div>        
        <Modal isOpen={projectadding} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Project List</ModalHeader>
          <ModalBody>
          
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="project">Project Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name..."
                  onChange={this.onChange}
                  invalid={(this.state.name.length<3 || this.state.name.length>30)}                  
                />
                <Label for="project">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Add a description..."
                  onChange={this.onChange}
                  invalid={this.state.description.length>100}
                />
                {this.state.msg===null?(<Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Project
                </Button>):<Button disabled color="dark" style={{ marginTop: "2rem" }} block>
                  Add Project
                </Button>}
                
              </FormGroup>
              {this.state.msg ? (
              <Alert color="danger"> {this.state.msg}</Alert>
            ) : null}
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project,  
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { addProject,clearErrors,projectAdded })(ProjectModal);
