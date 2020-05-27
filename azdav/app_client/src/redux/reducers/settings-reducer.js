const UPDATE_NEW_QUOTA_SETTINGS_BODY = "UPDATE_NEW_QUOTA_SETTINGS_BODY";
const UPDATE_NEW_MIN_LENGTH_PASS_BODY = "UPDATE_NEW_MIN_LENGTH_PASS_BODY";
const RESPONSE_SAVE_SETTINGS = "RESPONSE_SAVE_SETTINGS";

let initialState = {
  quotaSetting: "",
  ghostQuotaSetting: "",
  minLengthPassSetting: "",
  ghostMinLengthPassSetting: "",
  responseSaveSettings: "",
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_QUOTA_SETTINGS_BODY: {
      return {
        ...state,
        quotaSetting: action.quotaBody,
      };
    }
    case UPDATE_NEW_MIN_LENGTH_PASS_BODY: {
      return {
        ...state,
        minLengthPassSetting: action.minLengthPassBody,
      };
    }

    case RESPONSE_SAVE_SETTINGS: {
      debugger;
      return {
        ...state,
        responseSaveSettings: action.responseSaveSettings,
      };
    }

    default:
      return state;
  }
};

export const updateNewQuotaChangeAC = (quotaBody) => ({
  type: UPDATE_NEW_QUOTA_SETTINGS_BODY,
  quotaBody: quotaBody,
});

export const updateNewMinLengthPassChangeAC = (minLengthPassBody) => ({
  type: UPDATE_NEW_MIN_LENGTH_PASS_BODY,
  minLengthPassBody: minLengthPassBody,
});

export const responseSaveSettingsAC = (responseSaveSettings) => ({
  type: RESPONSE_SAVE_SETTINGS,
  responseSaveSettings: responseSaveSettings,
});

export default settingsReducer;
