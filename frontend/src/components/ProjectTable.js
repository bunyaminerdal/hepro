import React, { Component } from "react";
import PropTypes from "prop-types";
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
} from "reactstrap";
import { connect } from "react-redux";

class ProjectTable extends Component {
  state = {
    dropdownOpen: false,
  };
  static propTypes = {
    prop: PropTypes,
  };
  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  render() {
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
              <Button outline color="secondary">
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(ProjectTable);
