import React, { Component } from "react";
import { connect } from "react-redux";
import { getDms, dmAdding, deleteDm, dmEditing } from "../actions/dmActions";
import { deleteVal } from "../actions/valueActions";
import { selectedDm, deselectDm } from "../actions/authActions";
import { ListGroup, ListGroupItem, Button, Row, Col } from "reactstrap";
import DmAddForm from "./dmComponents/DmAddForm";
import DmEditForm from "./dmComponents/DmEditForm";
import DmListGroup from "./dmComponents/DmListGroup";
import Spinner from "reactstrap/lib/Spinner";
import ProjectTable from "./ProjectTable";

export class ProjectMain extends Component {
  componentDidMount() {
    if (this.props.projectId) {
      this.props.getDms(this.props.projectId);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.auth.dm === null)
      if (this.props.dm.dms.length > 0) {
        if (this.props.dm.dms[0]) {
          this.props.selectedDm(this.props.dm.dms[0]._id);
        }
      }
  }

  onDeleteClick = (id) => {
    if (this.props.dm.dms.length > 1) {
      if (this.props.auth.dm === id) {
        this.props.deselectDm();
      }
      this.props.value.vals.forEach((val) => {
        if (val.dmId === id) {
          this.props.deleteVal(val._id);
        }
      });

      this.props.deleteDm(id);
    }
  };
  onEditClick = (id) => {
    this.props.dmEditing(id);
  };
  onAddClick = () => {
    this.props.dmAdding();
  };
  onSelectClick = (id) => {
    if (this.props.auth.dm !== id) {
      this.props.selectedDm(id);
    }
  };
  render() {
    const { project } = this.props.auth;
    const { dms, dmediting, dmadding, selecteddm, dmloading } = this.props.dm;
    return (
      <div className="mt-3 ml-3 mr-3">
        {dmloading ? (
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
            <Col xs="auto">
              <ListGroup>
                <Button
                  color="dark"
                  onClick={() => {
                    this.onAddClick();
                  }}
                  block
                >
                  Add Decision Maker
                </Button>
                {dmadding ? (
                  <ListGroupItem>
                    <DmAddForm />
                  </ListGroupItem>
                ) : null}

                {dms !== null
                  ? dms.map((dm) => (
                      <ListGroupItem key={dm._id}>
                        {dmediting && selecteddm._id === dm._id ? (
                          <DmEditForm dm={dm} />
                        ) : (
                          <DmListGroup
                            dm={dm}
                            onDeleteClick={this.onDeleteClick}
                            onEditClick={this.onEditClick}
                            onSelectClick={this.onSelectClick}
                          />
                        )}
                      </ListGroupItem>
                    ))
                  : null}
              </ListGroup>
            </Col>
            <Col xs="auto">
              <ProjectTable projectId={project} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  dm: state.dm,
  value: state.value,
});

export default connect(mapStateToProps, {
  getDms,
  dmAdding,
  deleteDm,
  dmEditing,
  selectedDm,
  deleteVal,
  deselectDm,
})(ProjectMain);
