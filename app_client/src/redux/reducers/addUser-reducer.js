const UPDATE_NEW_LOGIN_BODY = "UPDATE_NEW_LOGIN_BODY";
const UPDATE_NEW_PASS_BODY = "UPDATE_NEW_PASS_BODY";
const UPDATE_NEW_REPEAT_PASS_BODY = "UPDATE_NEW_REPEAT_PASS_BODY";
const UPDATE_NEW_EMAIL_BODY = "UPDATE_NEW_EMAIL_BODY";
const UPDATE_NEW_FIO_BODY = "UPDATE_NEW_FIO_BODY";
const UPDATE_NEW_QUOTA_BODY = "UPDATE_NEW_QUOTA_BODY";
const ADD_USER_NEW = "ADD_USER_NEW";
const SET_MIN_LENGTH_PASS = "SET_MIN_LENGTH_PASS";
const СHECK_ADD_USER_NEW = "СHECK_ADD_USER_NEW";

let initialState = {
  userId: "1",
  userLogin: "",
  userPass: "",
  userRepeatPass: "",
  userEmail: "",
  userFIO: "",
  userQuota: "5",
  userMinLengthPass: 0,
  formValidation: {
    errEmptyLogin: false,
    errEmptyFIO: false,
    errEmptyQuota: false,
    errMinLengthPass: false,
    errPassMismatch: false,
  },
  isCheckedAddUserNew: false,
};

const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_NEW: {
      return {
        ...state,
        userId: "",
        userLogin: "",
        userPass: "",
        userRepeatPass: "",
        userEmail: "",
        userFIO: "",
      };
    }
    case UPDATE_NEW_LOGIN_BODY: {
      return {
        ...state,
        userLogin: action.loginBody,
      };
    }
    case UPDATE_NEW_PASS_BODY: {
      return {
        ...state,
        userPass: action.passBody,
      };
    }
    case UPDATE_NEW_REPEAT_PASS_BODY: {
      return {
        ...state,
        userRepeatPass: action.repeatPassBody,
      };
    }
    case UPDATE_NEW_EMAIL_BODY: {
      return {
        ...state,
        userEmail: action.emailBody,
      };
    }
    case UPDATE_NEW_FIO_BODY: {
      return {
        ...state,
        userFIO: action.fioBody,
      };
    }
    case UPDATE_NEW_QUOTA_BODY: {
      return {
        ...state,
        userQuota: action.quotaBody,
      };
    }
    case SET_MIN_LENGTH_PASS: {
      return {
        ...state,
        userMinLengthPass: action.minLengthPass,
      };
    }

    case СHECK_ADD_USER_NEW: {
      var login = false;
      var fio = false;
      var quota = false;
      var minLengthPassword = false;
      var passwordMismatch = false;
      if (state.userLogin) {
        login = true;
      }
      if (state.userMinLengthPass <= state.userPass.length) {
        minLengthPassword = true;
      }
      if (state.userPass === state.userRepeatPass) {
        passwordMismatch = true;
      }
      if (state.userFIO) {
        fio = true;
      }
      if (state.userQuota) {
        quota = true;
      }
      if (login && minLengthPassword && passwordMismatch && fio && quota) {
        debugger;
        return {
          ...state,
          formValidation: {
            errEmptyLogin: login,
            errMinLengthPass: minLengthPassword,
            errPassMismatch: passwordMismatch,
            errEmptyFIO: fio,
            errEmptyQuota: quota,
          },
          isCheckedAddUserNew: true,
        };
      } else {
        return {
          ...state,
          formValidation: {
            errEmptyLogin: login,
            errMinLengthPass: minLengthPassword,
            errPassMismatch: passwordMismatch,
            errEmptyFIO: fio,
            errEmptyQuota: quota,
          },
          isCheckedAddUserNew: false,
        };
      }
    }

    default:
      return state;
  }
};
export const updateNewLoginChangeAC = (loginBody) => ({
  type: UPDATE_NEW_LOGIN_BODY,
  loginBody: loginBody,
});

export const updateNewPassChangeAC = (passBody) => ({
  type: UPDATE_NEW_PASS_BODY,
  passBody: passBody,
});

export const updateNewRepeatPassChangeAC = (repeatPassBody) => ({
  type: UPDATE_NEW_REPEAT_PASS_BODY,
  repeatPassBody: repeatPassBody,
});

export const updateNewEmailChangeAC = (emailBody) => ({
  type: UPDATE_NEW_EMAIL_BODY,
  emailBody: emailBody,
});

export const updateNewFIOChangeAC = (fioBody) => ({
  type: UPDATE_NEW_FIO_BODY,
  fioBody: fioBody,
});

export const updateNewQuotaChangeAC = (quotaBody) => ({
  type: UPDATE_NEW_QUOTA_BODY,
  quotaBody: quotaBody,
});

export const setMinLengthPassAC = (minLengthPass) => ({
  type: SET_MIN_LENGTH_PASS,
  minLengthPass: minLengthPass,
});

export const checkAddUserNewAC = () => ({
  type: СHECK_ADD_USER_NEW,
});

export const addUserNewAC = () => ({ type: ADD_USER_NEW });

export default addUserReducer;
