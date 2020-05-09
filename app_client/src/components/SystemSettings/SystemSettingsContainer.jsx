import React, { Component } from "react";
import { connect } from "react-redux";
import SystemSettings from "./SystemSettings";
import {
  updateNewQuotaChangeAC,
  updateNewMinLengthPassChangeAC,
  SaveSystemSettingsAC,
} from "../../redux/reducers/settings-reducer";
import { saveSettings } from "../../api/systemSettingsAPI";

class SystemSettingsContainer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <SystemSettings {...this.props} saveSettings={saveSettings} />
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    settingsPage: state.settingsPage,
  };
};
export default SystemSettingsContainer = connect(mapStateToProps, {
  updateNewQuotaChange: updateNewQuotaChangeAC,
  updateNewMinLengthPass: updateNewMinLengthPassChangeAC,
  SaveSystemSettings: SaveSystemSettingsAC,
})(SystemSettingsContainer);
