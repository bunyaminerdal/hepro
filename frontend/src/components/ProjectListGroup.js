import React, { Component } from "react";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";
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
              style={{ width: "90px" }}
            >
              DELETE
            </Button>
            <span> </span>
            <Button
              className="edit-btn"
              color="warning"
              size="sm"
              onClick={() => {
                this.props.onEditClick(this.props.project._id);
              }}
              style={{ width: "90px" }}
            >
              EDIT
            </Button>
            <Button
              outline
              color="secondary"
              onClick={() => {
                this.props.onSelectClick(this.props.project._id);
              }}
              style={{ width: "370px" }}
            >
              {this.props.project.name}
            </Button>
          </InputGroupAddon>

          <Input
            type="textarea"
            value={this.props.project.description}
            disabled
            style={{ height: "38px" }}
          ></Input>
        </InputGroup>
      </div>
    );
  }
}
