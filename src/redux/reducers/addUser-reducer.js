const UPDATE_NEW_LOGIN_BODY = "UPDATE_NEW_LOGIN_BODY";
const UPDATE_NEW_PASS_BODY = "UPDATE_NEW_PASS_BODY";
const UPDATE_NEW_REPEAT_PASS_BODY = "UPDATE_NEW_REPEAT_PASS_BODY";
const UPDATE_NEW_EMAIL_BODY = "UPDATE_NEW_EMAIL_BODY";
const UPDATE_NEW_FIO_BODY = "UPDATE_NEW_FIO_BODY";
const UPDATE_NEW_QUOTA_BODY = "UPDATE_NEW_QUOTA_BODY";
const ADD_USER_NEW = "ADD_USER_NEW";

let initialState = {
  userId: "1",
  userLogin: "",
  userPass: "",
  userRepeatPass: "",
  userEmail: "",
  userFIO: "",
  userQuota: "5",
};

const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_NEW: {
      let adduser = [
        {
          id: state.userId,
          login: state.userLogin,
          pass: state.userPass,
          repeatPass: state.userRepeatPass,
          email: state.userEmail,
          fio: state.userFIO,
          quota: state.userQuota,
        },
      ];
      return {
        ...state,
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

export const addUserNewAC = () => ({ type: ADD_USER_NEW });

export default addUserReducer;
