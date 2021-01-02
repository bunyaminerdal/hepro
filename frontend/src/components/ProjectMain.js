import React, { Component } from "react";
import { connect } from "react-redux";
import { getDms, dmAdding, deleteDm, dmEditing } from "../actions/dmActions";
import { ListGroup, ListGroupItem, Button, Row, Col } from "reactstrap";
import DmAddForm from "./DmAddForm";
import DmEditForm from "./DmEditForm";
import DmListGroup from "./DmListGroup";

export class ProjectMain extends Component {
  componentDidMount() {
    if (this.props.projectId) {
      this.props.getDms(this.props.projectId);
    }
  }
  onDeleteClick = (id) => {
    this.props.deleteDm(id);
  };
  onEditClick = (id) => {
    this.props.dmEditing(id);
  };
  onAddClick = () => {
    this.props.dmAdding();
  };
  render() {
    const { project } = this.props.auth;
    const { dms, dmediting, dmadding, selecteddm } = this.props.dm;
    return (
      <div className="mt-3 ml-3 mr-3">
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
          <Col xs="auto">{project}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  dm: state.dm,
});

export default connect(mapStateToProps, {
  getDms,
  dmAdding,
  deleteDm,
  dmEditing,
})(ProjectMain);
