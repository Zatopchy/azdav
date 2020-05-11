import React, { Component } from "react";
import { connect } from "react-redux";
import SystemSettings from "./SystemSettings";
import {
  updateNewQuotaChangeAC,
  updateNewMinLengthPassChangeAC,
  saveSystemSettingsAC,
  updateGhostQuotaSettingAC,
  updateGhostMinLengthPassSettingAC,
  responseSaveSettingsAC,
} from "../../redux/reducers/settings-reducer";
import { saveSettings, getSettings } from "../../api/systemSettingsAPI";

class SystemSettingsContainer extends Component {
  componentDidMount() {
    getSettings(
      this.props.updateGhostQuotaSetting,
      this.props.updateGhostMinLengthPassSetting
    );
  }

  componentWillUnmount() {
    this.props.responseSaveSettings("");
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
  updateGhostQuotaSetting: updateGhostQuotaSettingAC,
  updateGhostMinLengthPassSetting: updateGhostMinLengthPassSettingAC,
  saveSystemSettings: saveSystemSettingsAC,
  responseSaveSettings: responseSaveSettingsAC,
})(SystemSettingsContainer);
