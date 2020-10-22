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
import { editProject,projectEdited } from "../actions/projectActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class ProjectEditModal extends Component {
  state = {    
    ownerId:"",
    id: "",
    name: "",
    description: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    projectediting: PropTypes.bool,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  toggle = () => {     
    //clear errors
    this.props.clearErrors();
    this.props.projectEdited();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    
    if(this.props.project.projectediting){      
      if(prevState.ownerId!==this.props.selectedproject.ownerId){
        this.setState({ownerId:this.props.selectedproject.ownerId})
      }
      if(prevState.id!==this.props.selectedproject._id){
        this.setState({id:this.props.selectedproject._id})
      }
      if(prevState.name!==this.props.selectedproject.name){
        this.setState({name:this.props.selectedproject.name})
      }
      if(prevState.description!==this.props.selectedproject.description){
        this.setState({description:this.props.selectedproject.description})
      }
      
      
    }
    const { error } = this.props;
      if (error !== prevProps.error) {
        //check for register error
        if (error.id === "PROJECT_EDIT_FAIL") {
          this.setState({ msg: error.msg.msg });
        } else {
          this.setState({ msg: null });
        }
      }

  }
  

  onSubmit = (e) => {
    e.preventDefault();
    
    const editingProject = {
      ownerId:this.state.ownerId,
      _id: this.state.id,      
      name: this.state.name,
      description: this.state.description,
    };
    
    //add item via add item action
    this.props.editProject(this.props.selectedproject._id,editingProject);
    
  };

  render() {
    const {selectedproject,projectediting} = this.props.project;
    
    return (
      
      <div>
        
        <Modal isOpen={projectediting} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
          <ModalBody>
          {this.state.msg ? (
              <Alert color="danger"> {this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="project">Project Name</Label>
                {selectedproject?(
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name..."
                  onChange={this.onChange}
                  defaultValue={selectedproject.name}
                  
                /> 
                ) : null}
                
                <Label for="project">Description</Label>
                {selectedproject?(
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Add a description..."
                  onChange={this.onChange}
                  defaultValue={selectedproject.description}
                />
                ) : null}
                {this.state.msg===null?(<Button color="dark" style={{ marginTop: "2rem" }} block>
                  Edit Project
                </Button>):<Button disabled color="dark" style={{ marginTop: "2rem" }} block>
                  Edit Project
                </Button>}
                
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
  error: state.error,
});

export default connect(mapStateToProps, { editProject,projectEdited,clearErrors })(ProjectEditModal);
