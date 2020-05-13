import * as axios from "axios";

const instanceSystemSettings = axios.create({
  baseURL: "/appSettingsAPI/",
});

export const getSettings = (_getQuota, _getMinLengthPass) => {
  debugger;
  return instanceSystemSettings.get(`getSettings`).then((res) => {
    debugger;
    var dataSettings = res.data.systemSettings;
    _getQuota(dataSettings.quota);
    _getMinLengthPass(dataSettings.minLengthPass);
  });
};

export const saveSettings = (
  _saveSystemSettings,
  _responseSaveSettings,
  _quota,
  _legthPass
) => {
  debugger;
  return instanceSystemSettings
    .post(`saveSettings`, {
      quota: _quota,
      minLengthPass: _legthPass,
    })
    .then(function (response) {
      console.log(response.data); // Это полноценный ответ сервера на POST запрос
      _saveSystemSettings();
      _responseSaveSettings(response.data.responseSaveData);
    })
    .catch(function (error) {
      console.log(error);
    });
};
