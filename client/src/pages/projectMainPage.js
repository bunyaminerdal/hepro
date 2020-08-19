import React from "react";
import { connect } from "react-redux";

export const projectMainPage = () => {
  return <div>project Main</div>;
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(projectMainPage);
