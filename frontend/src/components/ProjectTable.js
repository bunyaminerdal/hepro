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
import {
  getCrits,
  critAdding,
  deleteCrit,
  critEditing,
} from "../actions/criteriaActions";
import {
  getVals,
  addVal,
  valEditing,
  valAdding,
  deleteVal,
} from "../actions/valueActions";
import { deselectDm } from "../actions/authActions";
import AltAddForm from "./altComponents/AltAddForm";
import AltEditForm from "./altComponents/AltEditForm";
import AltListGroup from "./altComponents/AltListGroup";
import CritAddForm from "./critComponents/CritAddForm";
import CritListGroup from "./critComponents/CritListGroup";
import CritEditForm from "./critComponents/CritEditForm";

class ProjectTable extends Component {
  state = {
    dropdownOpen: false,
  };
  componentDidMount() {
    if (this.props.projectId) {
      this.props.getCrits(this.props.projectId);
      this.props.getAlts(this.props.projectId);
      this.props.getVals(this.props.projectId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dm.dms.length > prevProps.dm.dms.length) {
      let difference = this.props.dm.dms.filter(
        (x) => !prevProps.dm.dms.includes(x)
      );

      this.props.criteria.crits.forEach((crit) => {
        this.props.alternative.alts.forEach((alt) => {
          this.props.valAdding();
          this.props.addVal(
            "asd",
            this.props.auth.project,
            difference[0]._id,
            crit._id,
            alt._id
          );
        });
      });
    }
    if (
      this.props.alternative.alts.length > prevProps.alternative.alts.length
    ) {
      let difference1 = this.props.alternative.alts.filter(
        (x) => !prevProps.alternative.alts.includes(x)
      );
      this.props.criteria.crits.forEach((crit) => {
        this.props.dm.dms.forEach((dm) => {
          this.props.valAdding();
          this.props.addVal(
            "asd",
            this.props.auth.project,
            dm._id,
            crit._id,
            difference1[0]._id
          );
        });
      });
    }
    if (this.props.criteria.crits.length > prevProps.criteria.crits.length) {
      let difference2 = this.props.criteria.crits.filter(
        (x) => !prevProps.criteria.crits.includes(x)
      );
      this.props.alternative.alts.forEach((alt) => {
        this.props.dm.dms.forEach((dm) => {
          this.props.valAdding();
          this.props.addVal(
            "asd",
            this.props.auth.project,
            dm._id,
            difference2[0]._id,
            alt._id
          );
        });
      });
    }
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  onAltDeleteClick = (id) => {
    this.props.value.vals.forEach((val) => {
      if (val.alternativeId === id) {
        this.props.deleteVal(val._id);
      }
    });
    this.props.deleteAlt(id);
  };
  onAltEditClick = (id) => {
    this.props.altEditing(id);
  };
  onAltAddClick = () => {
    this.props.altAdding();
  };
  onCritDeleteClick = (id) => {
    this.props.value.vals.forEach((val) => {
      if (val.criteriaId === id) {
        this.props.deleteVal(val._id);
      }
    });
    this.props.deleteCrit(id);
  };
  onCritEditClick = (id) => {
    this.props.critEditing(id);
  };
  onCritAddClick = () => {
    this.props.critAdding();
  };
  render() {
    const {
      alts,
      altediting,
      altadding,
      selectedalt,
      altloading,
    } = this.props.alternative;
    const {
      crits,
      critediting,
      critadding,
      selectedcrit,
      critloading,
    } = this.props.criteria;
    const { vals, valloading } = this.props.value;
    return (
      <div>
        <Row>
          <ButtonToolbar>
            <ButtonGroup>
              <Button outline color="secondary" onClick={this.onCritAddClick}>
                C+
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button outline color="secondary" onClick={this.onAltAddClick}>
                A+
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
        {altadding ? (
          <Row>
            <AltAddForm />
          </Row>
        ) : null}
        {critadding ? (
          <Row>
            <CritAddForm />
          </Row>
        ) : null}
        {altloading || critloading || valloading ? (
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
                  <th>Criteria Name</th>
                  {crits !== null
                    ? crits.map((crit) => (
                        <th key={crit._id}>
                          {critediting && selectedcrit._id === crit._id ? (
                            <CritEditForm crit={crit} />
                          ) : (
                            <CritListGroup
                              crit={crit}
                              onDeleteClick={this.onCritDeleteClick}
                              onEditClick={this.onCritEditClick}
                            />
                          )}
                        </th>
                      ))
                    : null}
                </tr>
              </thead>
              <tbody>
                {alts !== null
                  ? alts.map((alt) => (
                      <tr key={alt._id}>
                        <th scope="row">
                          {altediting && selectedalt._id === alt._id ? (
                            <AltEditForm alt={alt} />
                          ) : (
                            <AltListGroup
                              alt={alt}
                              onDeleteClick={this.onAltDeleteClick}
                              onEditClick={this.onAltEditClick}
                            />
                          )}
                        </th>
                        {!valloading && crits !== null
                          ? crits.map((crit) => (
                              <th key={crit._id}>
                                {this.props.auth.dm
                                  ? vals
                                      .filter(
                                        (val) =>
                                          val.dmId === this.props.auth.dm &&
                                          val.criteriaId === crit._id &&
                                          val.alternativeId === alt._id
                                      )
                                      .map((val) => val.input)
                                  : null}
                              </th>
                            ))
                          : null}
                      </tr>
                    ))
                  : null}
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
  dm: state.dm,
  alternative: state.alternative,
  criteria: state.criteria,
  value: state.value,
});

export default connect(mapStateToProps, {
  getAlts,
  altAdding,
  deleteAlt,
  altEditing,
  getCrits,
  critAdding,
  deleteCrit,
  critEditing,
  getVals,
  valEditing,
  addVal,
  valAdding,
  deselectDm,
  deleteVal,
})(ProjectTable);
