import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { getExportFile } from "../../api/headerAPI";

class HeaderContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header {...this.props} getExportFile={getExportFile} />
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    header: state.header,
  };
};

export default HeaderContainer = connect(mapStateToProps, {})(HeaderContainer);
