import React, { Component } from "react";
import { connect } from "react-redux";
import { getDms,dmAdding,deleteDm ,dmEditing} from "../actions/dmActions";
import PropTypes from "prop-types";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import DmModal from "../components/dmModal";
import DmEditModal from "../components/dmEditModal";

export class ProjectMain extends Component {
  static propTypes = {
    dm: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    const { project } = this.props.auth;
    if(project){
      this.props.getDms(project);
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
    const { dms } = this.props.dm;
    return (
      <div className="mt-3 ml-3 mr-3" >
        <Row>
          <Col xs="4">
            <ListGroup>
            <Button
            color="dark"            
            onClick={this.onAddClick.bind(this)}
            block
          >
            Add Decision Maker
          </Button>
              <TransitionGroup className="dm-list">
                 <DmModal  />
                <DmEditModal/>
                {dms!==null?dms.map(({ _id, name }) => (
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
                      <span>  </span>
                  <Button
                    className="edit-btn"
                    color="warning"
                    size="sm"
                    onClick={this.onEditClick.bind(this, _id)}
                  >
                    EDIT
                  </Button>
                      <Link to="#"
                        className="ml-3 mr-3"
                        //onClick={this.onSelectClick.bind(this, _id)}
                      >
                        {name}
                      </Link>
                    </ListGroupItem>
                  </CSSTransition>
                )):null}
              </TransitionGroup>
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

export default connect(mapStateToProps, { getDms,dmAdding,deleteDm,dmEditing })(ProjectMain);
