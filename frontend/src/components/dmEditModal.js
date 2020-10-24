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
import { editDm,dmEdited } from "../actions/dmActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class DmEditModal extends Component {
  state = {
    ownerId: "",
    id:"",
    name: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,    
    dmediting: PropTypes.bool,    
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  toggle = () => {
    //clear errors
    this.props.clearErrors();    
    this.props.dmEdited();

  };
  onChange =  (e) => {
     this.setState({
      [e.target.name]: e.target.value,
    });
    
    
  };
  componentDidUpdate(prevProps, prevState) {
    if(this.props.dm.dmediting){      
      if(prevState.ownerId!==this.props.selecteddm.ownerId){
        this.setState({ownerId:this.props.selecteddm.ownerId})
      }
      if(prevState.id!==this.props.selecteddm._id){
        this.setState({id:this.props.selecteddm._id})
      }
      if(prevState.name!==this.props.selecteddm.name){
        this.setState({name:this.props.selecteddm.name})
      }
      if((this.state.msg && this.state.name)){
        this.setState({msg: null})
      }
    }
    const { error } = this.props;
      if (error !== prevProps.error) {
        //check for register error
        if (error.id === "DM_EDIT_FAIL") {
          this.setState({ msg: error.msg.msg });
        } else {
          this.setState({ msg: null });
        }
      }

  }
  onSubmit = (e) => {
    e.preventDefault();
    
    const editingDm = {
      ownerId:this.state.ownerId,
      _id: this.state.id,      
      name: this.state.name,
    };
    
    //add item via add item action
    this.props.editDm(this.props.selecteddm._id,editingDm);
    
  };

  render() {
    const {selecteddm,dmediting} = this.props.dm;
    return (
      <div>        
        <Modal isOpen={dmediting} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Decision Maker List</ModalHeader>
          <ModalBody>
          
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="dm">Decision Maker Name</Label>
                {selecteddm ?(
                <Input                
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name..."
                  onChange={this.onChange}
                  defaultValue={selecteddm.name}
                  invalid={(this.state.name.length<3 || this.state.name.length>30)}
                /> 
                ) : null}
                
                {this.state.msg===null?(<Button color="dark" style={{ marginTop: "2rem" }} block>
                  Edit Decision Maker
                </Button>):<Button disabled color="dark" style={{ marginTop: "2rem" }} block>
                Edit Decision Maker
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
  dm: state.dm,
  ownerId: state.auth.project,
  isAuthenticated: state.auth.isAuthenticated,
  selecteddm: state.dm.selecteddm,
  error: state.error,
});

export default connect(mapStateToProps, { editDm,clearErrors,dmEdited })(DmEditModal);
