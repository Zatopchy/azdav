import React from "react";

const SystemSettings = (props) => {
  let state = props.settingsPage;

  let newQuotaBody = state.quotaSetting;
  let newMinLengthPassBody = state.minLengthPassSetting;
  let responseSaveSettings = state.responseSaveSettings;

  let onNewQuotaChange = (e) => {
    let QuotaBody = e.target.value;
    props.updateNewQuotaChange(QuotaBody);
  };

  let onNewMinLengthPassChange = (e) => {
    let minLengthPassBody = e.target.value;
    props.updateNewMinLengthPass(minLengthPassBody);
  };

  let onSaveSystemSettingsClick = (e) => {
    props.saveSettings(
      props.responseSaveSettings,
      newQuotaBody,
      newMinLengthPassBody
    );
  };

  return (
    <div>
      <div className="row m-0">
        <div className="col-md-9 p-0 m-auto">
          <form method="POST" className="col-md-4 m-auto">
            <label className="mr-4 text-dark">Квота по умолчанию (МБ)</label>
            <input
              type="number"
              min="1024"
              className="form-control mb-3"
              value={newQuotaBody}
              onChange={onNewQuotaChange}
            />
            <label className="mr-4 text-dark">Минимальная длина пароля</label>
            <input
              type="number"
              min="0"
              max="25"
              className="form-control mb-3"
              value={newMinLengthPassBody}
              onChange={onNewMinLengthPassChange}
            />
            <input
              type="button"
              className="form-control btn btn-primary btn-sm"
              onClick={onSaveSystemSettingsClick}
              value="Сохранить настройки"
            />

            <div className="alert-primary text-center mt-4">
              {responseSaveSettings}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
