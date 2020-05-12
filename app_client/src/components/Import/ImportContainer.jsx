import React, { Component } from "react";
import { connect } from "react-redux";
import Import from "./Import";
import {
  updateNewImportChangeAC,
  loadImportNewAC,
} from "../../redux/reducers/import-reducer";
import { uploadImportFile } from "../../api/importAPI";

class ImportContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {
    this.props.updateNewImportChange("");
    this.props.loadImportNew("");
  }
  render() {
    return (
      <div>
        <Import {...this.props} uploadImportFile={uploadImportFile} />
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
