import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { getDms, deleteDm } from "../actions/dmActions";
import { selectedDm, deselectDm } from "../actions/authActions";
import PropTypes from "prop-types";

class ProjectMain extends Component {
  static propTypes = {
    dm: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    if (this.props.isAuthenticated) {
      //this.props.getDms(this.props.project.id);
    }
  }

  onDeleteClick = (id) => {
    this.props.deleteDm(id);
  };

  onSelectClick = (id) => {
    this.props.selectedDm(id);
  };

  render() {
    const { dms } = this.props.dm;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {dms.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  project: state.auth.project,
  dm: state.dm,
});

export default connect(mapStateToProps, {
  getDms,
  deleteDm,
  selectedDm,
  deselectDm,
})(ProjectMain);
