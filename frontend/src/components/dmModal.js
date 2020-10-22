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
import { addDm,dmAdded } from "../actions/dmActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

class DmModal extends Component {
  state = {
    ownerId: "",    
    name: "",
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
    this.props.dmAdded();

  };
  onChange =  (e) => {
     this.setState({
      [e.target.name]: e.target.value,
    });
    
  };
  componentDidUpdate(prevProps, prevState) {
    if(this.props.dm.dmadding){      
      
      if(prevProps!==this.props){
        this.setState({name:""})
      }     
      if(prevProps!==this.props){
        this.setState({ownerId:this.props.ownerId})        
      }    

      if(this.state.msg && this.state.name){
        this.setState({msg: null})
      }
    }
    const { error } = this.props;
      if (error !== prevProps.error) {
        //check for register error
        if (error.id === "DM_ADD_FAIL") {
          this.setState({ msg: error.msg.msg });
        } else {
          this.setState({ msg: null });
        }
      }

  }
  onSubmit = (e) => {
    e.preventDefault();

    const newDm = {      
      name: this.state.name,      
    };
    
    //add item via add item action
    this.props.addDm(newDm,this.state.ownerId);
    
  };

  render() {
    const {dmadding} = this.props.dm;
    return (
      <div>        
        <Modal isOpen={dmadding} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Decision Maker List</ModalHeader>
          <ModalBody>
          
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="dm">Decision Maker Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name..."
                  onChange={this.onChange}
                  invalid={this.state.msg!==null}
                />
                
                {this.state.msg===null?(<Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Decision Maker
                </Button>):<Button disabled color="dark" style={{ marginTop: "2rem" }} block>
                Add Decision Maker
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
  dm: state.dm,
  ownerId: state.auth.project,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { addDm,clearErrors,dmAdded })(DmModal);
