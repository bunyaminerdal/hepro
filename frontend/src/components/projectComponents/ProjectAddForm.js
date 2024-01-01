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
import { addProject, projectAdded } from "../../actions/projectActions";
import { clearErrors } from "../../actions/errorActions";

class ProjectAddForm extends Component {
  state = {
    name: "",
    description: "",
    msg: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      name: this.state.name,
      description: this.state.description,
    };

    //add item via add item action
    this.props.addProject(newProject);
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
    this.props.projectAdded();
  };

  componentDidUpdate(prevProps) {
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
                style={{ width: "90px" }}
              >
                ADD
              </Button>
              <span> </span>
              <Button
                className="warning-btn"
                color="warning"
                size="sm"
                onClick={this.handleCancel}
                style={{ width: "90px" }}
              >
                CANCEL
              </Button>
            </InputGroupAddon>
            <Input
              name="name"
              type="text"
              placeholder="Project name..."
              onChange={this.handleChange}
              invalid={
                this.state.name.length < 3 || this.state.name.length > 30
              }
            ></Input>
            <Input
              name="description"
              type="textarea"
              placeholder="Project description..."
              onChange={this.handleChange}
              style={{ height: "38px" }}
              invalid={this.state.description.length > 100}
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
  addProject,
  projectAdded,
  clearErrors,
})(ProjectAddForm);
