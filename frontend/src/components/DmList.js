import React, { Component } from "react";
import { connect } from "react-redux";
import { getDms } from "../actions/dmActions";
import PropTypes from "prop-types";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

export class ProjectMain extends Component {
  static propTypes = {
    dm: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    const { project } = this.props.auth;

    this.props.getDms(project);
  }
  render() {
    const { project } = this.props.auth;
    const { dms } = this.props.dm;
    return (
      <Container className="mt-3">
        <Row>
          <Col xs="3">
            <ListGroup>
              <TransitionGroup className="dm-list">
                {dms.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        //onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                      <Link
                        className="ml-3 mr-3"
                        //onClick={this.onSelectClick.bind(this, _id)}
                      >
                        {name}
                      </Link>
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </Col>
          <Col xs="auto">{project}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  dm: state.dm,
});

export default connect(mapStateToProps, { getDms })(ProjectMain);
