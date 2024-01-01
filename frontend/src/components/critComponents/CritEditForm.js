import React, { Component } from "react";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Form,
  Input,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { editCrit, critEdited } from "../../actions/criteriaActions";
import { clearErrors } from "../../actions/errorActions";

class CritEditForm extends Component {
  state = {
    name: this.props.crit.name,
    msg: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const editingCrit = {
      //ownerid kullanılıyor mu bak
      _id: this.props.crit._id,
      ownerId: this.props.crit.ownerId,
      name: this.state.name.trim(),
      date: this.props.crit.date,
      __v: this.props.crit.__v,
    };

    //add item via add item action
    this.props.editCrit(this.props.crit._id, editingCrit);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (this.state.msg !== null) {
      this.props.clearErrors();
    }
  };
  handleCancel = (e) => {
    this.props.clearErrors();
    this.props.critEdited();
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "CRIT_EDIT_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button
                className="info-btn"
                color="info"
                size="sm"
                onClick={this.handleSubmit}
              >
                OK
              </Button>
              <span> </span>
              <Button
                className="warning-btn"
                color="warning"
                size="sm"
                onClick={this.handleCancel}
              >
                C
              </Button>
            </InputGroupAddon>
            <Input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              invalid={
                this.state.name.length < 3 || this.state.name.length > 30
              }
            ></Input>

            <InputGroupAddon addonType="append"></InputGroupAddon>
          </InputGroup>

          {this.state.msg ? (
            <Alert color="danger"> {this.state.msg}</Alert>
          ) : null}
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, {
  editCrit,
  critEdited,
  clearErrors,
})(CritEditForm);
