import * as axios from "axios";

const instanceSystemSettings = axios.create({
  baseURL: "/appSettingsAPI/",
});

export const saveSettings = (_SaveSystemSettings, _quota, _legthPass) => {
  debugger;
  return instanceSystemSettings
    .post(`saveSettings`, {
      quota: _quota,
      minLengthPass: _legthPass,
    })
    .then(function (response) {
      console.log(response.data); // Это полноценный ответ сервера на POST запрос
      _SaveSystemSettings();
    })
    .catch(function (error) {
      console.log(error);
    });
};
