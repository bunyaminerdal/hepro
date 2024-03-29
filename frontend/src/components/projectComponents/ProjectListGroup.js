import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, InputGroup, InputGroupAddon, Input } from "reactstrap";

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
              tag={Link}
              outline
              color="secondary"
              style={{ width: "270px" }}
              onClick={() => {
                this.props.onSelectClick(this.props.project._id);
              }}
              to={"/project/" + this.props.project._id}
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
