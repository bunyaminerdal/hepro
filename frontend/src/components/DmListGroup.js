import React, { Component } from "react";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";

export default class DmListGroup extends Component {
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
                this.props.onDeleteClick(this.props.dm._id);
              }}
              //style={{ width: "90px" }}
            >
              X
            </Button>
            <span> </span>
            <Button
              className="edit-btn"
              color="warning"
              size="sm"
              onClick={() => {
                this.props.onEditClick(this.props.dm._id);
              }}
              //style={{ width: "90px" }}
            >
              E
            </Button>
            <Button
              outline
              color="secondary"
              /* onClick={() => {
                this.props.onSelectClick(this.props.dm._id);
              }} */
              style={{ width: "270px" }}
            >
              {this.props.dm.name}
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
