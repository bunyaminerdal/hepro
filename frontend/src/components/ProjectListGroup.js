import React, { Component } from "react";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import { Link } from "react-router-dom";

export default class ProjectListGroup extends Component {
  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button
              className="remove-btn"
              color="danger"
              size="sm"
              onClick={() => {
                this.props.onDeleteClick(this.props.project._id);
              }}
            >
              &times;
            </Button>
            <span> </span>
            <Button
              className="edit-btn"
              color="warning"
              size="sm"
              onClick={() => {
                this.props.onEditClick(this.props.project._id);
              }}
            >
              EDIT
            </Button>
          </InputGroupAddon>
          <Link
            to="#"
            className="ml-3 mr-3"
            onClick={() => {
              this.props.onSelectClick(this.props.project._id);
            }}
          >
            {this.props.project.name}
          </Link>
          | {this.props.project.description}
        </InputGroup>
      </div>
    );
  }
}
