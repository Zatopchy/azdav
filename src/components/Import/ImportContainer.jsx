import react from "react";
import { connect } from "react-redux";
import Import from "./Import";
import {
  updateNewImportChangeAC,
  loadImportNewAC,
} from "../../redux/reducers/import-reducer";

let mapStateToProps = (state) => {
  return {
    importPage: state.importPage,
  };
};

const ImportContainer = connect(mapStateToProps, {
  updateNewImportChange: updateNewImportChangeAC,
  loadImportNew: loadImportNewAC,
})(Import);

export default ImportContainer;
