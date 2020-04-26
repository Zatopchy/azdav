import React from "react";
import { connect } from "react-redux";
import SystemSettings from "./SystemSettings";
import {
  updateNewQuotaChangeAC,
  updateNewMinLengthPassChangeAC,
  SaveSystemSettingsAC,
} from "../../redux/reducers/settings-reducer";

let mapStateToProps = (state) => {
  return {
    settingsPage: state.settingsPage,
  };
};

const SystemSettingsContainer = connect(mapStateToProps, {
  updateNewQuotaChange: updateNewQuotaChangeAC,
  updateNewMinLengthPass: updateNewMinLengthPassChangeAC,
  SaveSystemSettings: SaveSystemSettingsAC,
})(SystemSettings);

export default SystemSettingsContainer;
