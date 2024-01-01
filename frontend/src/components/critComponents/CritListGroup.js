import React, { Component } from "react";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import { connect } from "react-redux";
import Input from "reactstrap/lib/Input";

class CritListGroup extends Component {
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
                this.props.onDeleteClick(this.props.crit._id);
              }}
            >
              X
            </Button>
            <span> </span>
            <Button
              className="edit-btn"
              color="warning"
              size="sm"
              onClick={() => {
                this.props.onEditClick(this.props.crit._id);
              }}
            >
              E
            </Button>
          </InputGroupAddon>
          <Input disabled value={this.props.crit.name} />
        </InputGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(CritListGroup);
