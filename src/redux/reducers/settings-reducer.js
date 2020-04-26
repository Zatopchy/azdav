const UPDATE_NEW_QUOTA_SETTINGS_BODY = "UPDATE_NEW_QUOTA_SETTINGS_BODY";
const UPDATE_NEW_MIN_LENGTH_PASS_BODY = "UPDATE_NEW_MIN_LENGTH_PASS_BODY";
const SAVE_SYSTEM_SETTINGS = "SAVE_SYSTEM_SETTINGS";

let initialState = {
  quotaSetting: "we",
  minLengthPassSetting: "",
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
    case SAVE_SYSTEM_SETTINGS: {
      let settings = [
        {
          quota: state.quotaSetting,
          minLengthPass: state.minLengthPassSetting,
        },
      ];
      return {
        ...state,
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

export const SaveSystemSettingsAC = () => ({
  type: SAVE_SYSTEM_SETTINGS,
});

export default settingsReducer;
