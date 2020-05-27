import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getExportFile, redirectOnNginx } from "../../api/headerAPI";
import { withRouter } from "react-router-dom";

class HeaderContainer extends Component {
  componentDidMount() {
    redirectOnNginx();
  }

  render() {
    return (
      <div>
        <Header
          {...this.props}
          getExportFile={getExportFile}
        />
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    header: state.header,
  };
};
let WithUrlDataContainerComponent = withRouter(HeaderContainer);
export default HeaderContainer = connect(mapStateToProps, {})(WithUrlDataContainerComponent);
