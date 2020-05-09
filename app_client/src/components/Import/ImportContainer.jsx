import React, { Component } from "react";
import { connect } from "react-redux";
import Import from "./Import";
import {
  updateNewImportChangeAC,
  loadImportNewAC,
} from "../../redux/reducers/import-reducer";

class ImportContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Import {...this.props} />
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    importPage: state.importPage,
  };
};

export default ImportContainer = connect(mapStateToProps, {
  updateNewImportChange: updateNewImportChangeAC,
  loadImportNew: loadImportNewAC,
})(ImportContainer);
