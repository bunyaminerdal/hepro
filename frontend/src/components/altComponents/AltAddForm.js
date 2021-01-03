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
import { addAlt, altAdded } from "../../actions/alternativeActions";
import { clearErrors } from "../../actions/errorActions";

class AltAddForm extends Component {
  state = {
    name: "",
    msg: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const newAlt = {
      name: this.state.name,
    };

    //add item via add item action
    this.props.addAlt(newAlt, this.props.projectId);
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
    this.props.altAdded();
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "ALT_ADD_FAIL") {
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
                //style={{ width: "90px" }}
              >
                A
              </Button>
              <span> </span>
              <Button
                className="warning-btn"
                color="warning"
                size="sm"
                onClick={this.handleCancel}
                //style={{ width: "90px" }}
              >
                C
              </Button>
            </InputGroupAddon>
            <Input
              name="name"
              type="text"
              placeholder="Alternative name..."
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
  projectId: state.auth.project,
});

export default connect(mapStateToProps, {
  addAlt,
  altAdded,
  clearErrors,
})(AltAddForm);
