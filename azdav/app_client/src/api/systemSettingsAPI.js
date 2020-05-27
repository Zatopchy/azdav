import * as axios from "axios";

const instanceSystemSettings = axios.create({
  baseURL: "/appSettingsAPI/",
});

export const getSettings = (_getQuota, _getMinLengthPass) => {
  return instanceSystemSettings.get(`getSettings`).then((res) => {
    var dataSettings = res.data.systemSettings;
    _getQuota(dataSettings.quota);
    _getMinLengthPass(dataSettings.minLengthPass);
  });
};

export const saveSettings = (_responseSaveSettings, _quota, _legthPass) => {
  return instanceSystemSettings
    .post(`saveSettings`, {
      quota: _quota,
      minLengthPass: _legthPass,
    })
    .then(function (response) {
      console.log(response.data);
      _responseSaveSettings(response.data.responseSaveData);
    })
    .catch(function (error) {
      console.log(error);
    });
};
