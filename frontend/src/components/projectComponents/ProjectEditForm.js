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
import { editProject, projectEdited } from "../../actions/projectActions";
import { clearErrors } from "../../actions/errorActions";

class ProjectEditForm extends Component {
  state = {
    name: this.props.project.name,
    description: this.props.project.description,
    msg: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const editingProject = {
      //ownerid kullanılıyor mu bak
      _id: this.props.project._id,
      ownerId: this.props.project.ownerId,
      name: this.state.name.trim(),
      description: this.state.description.trim(),
      date: this.props.project.date,
      __v: this.props.project.__v,
    };

    //add item via add item action
    this.props.editProject(this.props.project._id, editingProject);
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
    this.props.projectEdited();
  };

  componentDidUpdate(prevProps) {
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
                DONE
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
              value={this.state.name}
              onChange={this.handleChange}
              invalid={
                this.state.name.length < 3 || this.state.name.length > 30
              }
            ></Input>
            <Input
              name="description"
              type="textarea"
              value={this.state.description}
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
  editProject,
  projectEdited,
  clearErrors,
})(ProjectEditForm);
