const UPDATE_NEW_QUOTA_SETTINGS_BODY = "UPDATE_NEW_QUOTA_SETTINGS_BODY";
const UPDATE_NEW_MIN_LENGTH_PASS_BODY = "UPDATE_NEW_MIN_LENGTH_PASS_BODY";
const SAVE_SYSTEM_SETTINGS = "SAVE_SYSTEM_SETTINGS";
const UPDATE_NEW_GHOST_QUOTA_SETTINGS_BODY =
  "UPDATE_NEW_GHOST_QUOTA_SETTINGS_BODY";
const UPDATE_NEW_GHOST_MIN_LENGTH_PASS_BODY =
  "UPDATE_NEW_GHOST_MIN_LENGTH_PASS_BODY";
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
    case UPDATE_NEW_GHOST_QUOTA_SETTINGS_BODY: {
      return {
        ...state,
        ghostQuotaSetting: action.ghostQuotaSetting,
      };
    }
    case UPDATE_NEW_GHOST_MIN_LENGTH_PASS_BODY: {
      return {
        ...state,
        ghostMinLengthPassSetting: action.ghostMinLengthPassSetting,
      };
    }
    case SAVE_SYSTEM_SETTINGS: {
      debugger;
      return {
        ...state,
        ghostQuotaSetting: state.quotaSetting,
        ghostMinLengthPassSetting: state.minLengthPassSetting,
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

export const updateGhostQuotaSettingAC = (ghostQuotaSetting) => ({
  type: UPDATE_NEW_GHOST_QUOTA_SETTINGS_BODY,
  ghostQuotaSetting: ghostQuotaSetting,
});

export const updateGhostMinLengthPassSettingAC = (
  ghostMinLengthPassSetting
) => ({
  type: UPDATE_NEW_GHOST_MIN_LENGTH_PASS_BODY,
  ghostMinLengthPassSetting: ghostMinLengthPassSetting,
});

export const responseSaveSettingsAC = (responseSaveSettings) => ({
  type: RESPONSE_SAVE_SETTINGS,
  responseSaveSettings: responseSaveSettings,
});

export const saveSystemSettingsAC = () => ({
  type: SAVE_SYSTEM_SETTINGS,
});

export default settingsReducer;
