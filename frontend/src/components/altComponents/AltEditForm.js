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
import { editAlt, altEdited } from "../../actions/alternativeActions";
import { clearErrors } from "../../actions/errorActions";

class AltEditForm extends Component {
  state = {
    name: this.props.alt.name,
    msg: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const editingAlt = {
      //ownerid kullanılıyor mu bak
      _id: this.props.alt._id,
      ownerId: this.props.alt.ownerId,
      name: this.state.name.trim(),
      date: this.props.alt.date,
      __v: this.props.alt.__v,
    };

    //add item via add item action
    this.props.editAlt(this.props.alt._id, editingAlt);
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
    this.props.altEdited();
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "ALT_EDIT_FAIL") {
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
  editAlt,
  altEdited,
  clearErrors,
})(AltEditForm);
