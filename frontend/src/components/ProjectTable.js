import React, { Component } from "react";
import {
  Row,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import {
  getAlts,
  altAdding,
  deleteAlt,
  altEditing,
} from "../actions/alternativeActions";

class ProjectTable extends Component {
  state = {
    dropdownOpen: false,
  };
  componentDidMount() {
    if (this.props.auth.project) {
      this.props.getAlts(this.props.auth.project);
    }
  }
  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  onAltDeleteClick = (id) => {
    this.props.deleteAlt(id);
  };
  onAltEditClick = (id) => {
    this.props.altEditing(id);
  };
  onAltAddClick = () => {
    this.props.altAdding();
  };
  render() {
    const {
      alts,
      altediting,
      altadding,
      selectedalt,
      loading,
    } = this.props.alternative;
    return (
      <div>
        <Row>
          <ButtonToolbar>
            <ButtonGroup>
              <Button outline color="secondary">
                K+
              </Button>
              <Button outline color="secondary">
                K-
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button outline color="secondary" onClick={this.onAltAddClick}>
                A+
              </Button>
              <Button outline color="secondary">
                A-
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button outline color="secondary">
                5
              </Button>
              <Button outline color="secondary">
                6
              </Button>
              <Button outline color="secondary">
                7
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret outline color="secondary">
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Dropdown Link</DropdownItem>
                  <DropdownItem>Dropdown Link</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>

        {loading ? (
          <Row>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <h3 className="ml-3"> Loading...</h3>
          </Row>
        ) : (
          <Row>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">BMW</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">MERCEDES</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">AUDI</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  alternative: state.alternative,
});

export default connect(mapStateToProps, {
  getAlts,
  altAdding,
  deleteAlt,
  altEditing,
})(ProjectTable);
