import React, { Component } from "react";
import { Button, InputGroup, InputGroupAddon } from "reactstrap";
import { connect } from "react-redux";

class DmListGroup extends Component {
  state = {
    activedm: null,
  };

  componentDidMount() {
    if (this.props.auth.dm !== null) {
      this.setState({
        activedm: this.props.auth.dm,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.dm !== this.props.auth.dm) {
      this.setState({
        activedm: this.props.auth.dm,
      });
    }
  }

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
            >
              E
            </Button>
            <Button
              outline
              color="secondary"
              active={this.state.activedm === this.props.dm._id}
              onClick={() => {
                this.props.onSelectClick(this.props.dm._id);
              }}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(DmListGroup);
