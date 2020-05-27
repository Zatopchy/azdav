const LOCK_USER = "LOCK_USER";
const UNLOCK_USER = "UNLOCK_USER";
const EDIT_USER = "EDIT_USER";
const AREA_USER_SEARCH = "AREA_USER_SEARCH";
const SEARCH_USER = "SEARCH_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_LIST = "GET_USER_LIST";
const CLEAR_USER_LIST = "CLEAR_USER_LIST";
const IS_FETCHING = "IS_FETCHING";
const RUN_MODAL_EDIT = "RUN_MODAL_EDIT";
const CLOSE_MODAL_EDIT = "CLOSE_MODAL_EDIT";
const RUN_MODAL_DELETE = "RUN_MODAL_DELETE";
const CLOSE_MODAL_DELETE = "CLOSE_MODAL_DELETE";

const EMAIL_EDIT = "EMAIL_EDIT";
const LEVEL_EDIT = "LEVEL_EDIT";
const PASS_EDIT = "PASS_EDIT";
const FIO_EDIT = "FIO_EDIT";
const QUOTA_EDIT = "QUOTA_EDIT";
const TELEPHONE_EDIT = "TELEPHONE_EDIT";
const COMMENT_EDIT = "COMMENT_EDIT";
const NEW_USER_PASS = "NEW_USER_PASS";
const MIN_LENGTH_PASS = "MIN_LENGTH_PASS";
const СHECK_EDIT_USER_NEW = "СHECK_EDIT_USER_NEW";

let initialState = {
  users: [],
  modalUserEdit: {
    userId: null,
    userLogin: null,
    userPass: "",
    userMinLenghtPass: 0,
    userPassResponse: null,
    userEmail: null,
    userFIO: "",
    userLevel: null,
    userQuota: null,
    userTelephone: null,
    userComment: null,
    isRun: false,
    formValidation: {
      errEmptyFIO: false,
      errMinLengthPass: false,
    },
    isCheckedAddUserNew: false,
  },
  modalUserDelete: {
    userId: null,
    userLogin: null,
    isRun: false,
  },

  areaUserSearch: "",
  isFetching: false,
};

const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER: {
      debugger;
      return {
        ...state,
        users: [
          {
            userId: action.usersList.id,
            userLogin: action.usersList.login,
            userEmail: action.usersList.email,
            userLevel: action.usersList.level,
            userTelephone: action.usersList.telephone,
            userComment: action.usersList.comment,
            userFIO: action.usersList.fio,
            userQuota: action.usersList.quota,
            userLock: action.usersList.isLocked,
          },
        ],
      };
    }
    case AREA_USER_SEARCH: {
      return {
        ...state,
        areaUserSearch: action.areaUserSearchBody,
      };
    }
    case LOCK_USER: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.userId === action.lockUserId) {
            return { ...u, userLock: "true" };
          }
          return { ...u };
        }),
      };
    }
    case UNLOCK_USER: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.userId === action.unLockUserId) {
            return { ...u, userLock: "false" };
          }
          return { ...u };
        }),
      };
    }
    case EDIT_USER: {
      console.log(action);
      debugger;
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.userId === action.userData.userId) {
            return {
              ...u,
              userEmail: action.userData.userEmail,
              userLevel: action.userData.userLevel,
              userQuota: action.userData.userQuota,
              userTelephone: action.userData.userTelephone,
              userComment: action.userData.userComment,
              userFIO: action.userData.userFIO,
            };
          }
          return { ...u };
        }),
      };
    }
    case EMAIL_EDIT: {
      return {
        ...state,
        modalUserEdit: { ...state.modalUserEdit, userEmail: action.email },
      };
    }
    case LEVEL_EDIT: {
      return {
        ...state,
        modalUserEdit: { ...state.modalUserEdit, userLevel: action.level },
      };
    }
    case PASS_EDIT: {
      return {
        ...state,
        modalUserEdit: { ...state.modalUserEdit, userPass: action.pass },
      };
    }
    case FIO_EDIT: {
      return {
        ...state,
        modalUserEdit: { ...state.modalUserEdit, userFIO: action.fio },
      };
    }
    case QUOTA_EDIT: {
      return {
        ...state,
        modalUserEdit: { ...state.modalUserEdit, userQuota: action.quota },
      };
    }
    case TELEPHONE_EDIT: {
      return {
        ...state,
        modalUserEdit: {
          ...state.modalUserEdit,
          userTelephone: action.telephone,
        },
      };
    }
    case COMMENT_EDIT: {
      return {
        ...state,
        modalUserEdit: { ...state.modalUserEdit, userComment: action.comment },
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        users: state.users.filter((el) => el.userId !== action.deleteUserId),
      };
    }
    case GET_USER_LIST: {
      return {
        ...state,
        users: [
          ...state.users,
          {
            userId: action.usersList.id,
            userLogin: action.usersList.login,
            userEmail: action.usersList.email,
            userLevel: action.usersList.level,
            userTelephone: action.usersList.telephone,
            userComment: action.usersList.comment,
            userFIO: action.usersList.fio,
            userQuota: action.usersList.quota,
            userLock: action.usersList.isLocked,
          },
        ],
      };
    }
    case CLEAR_USER_LIST: {
      return {
        ...state,
        users: [],
      };
    }
    case IS_FETCHING: {
      return {
        ...state,
        isFetching: action.boolIsFetching,
      };
    }
    case RUN_MODAL_EDIT: {
      return {
        ...state,
        modalUserEdit: {
          ...state.modalUserEdit,
          isRun: true,
          userId: action.editModalData.id,
          userLogin: action.editModalData.login,
          userEmail: action.editModalData.email,
          userLevel: action.editModalData.level,
          userQuota: action.editModalData.quota,
          userTelephone: action.editModalData.telephone,
          userComment: action.editModalData.comment,
          userFIO: action.editModalData.fio,
        },
      };
    }

    case NEW_USER_PASS: {
      return {
        ...state,
        modalUserEdit: {
          ...state.modalUserEdit,
          userPass: action.passClear,
          userPassResponse: action.passResponse,
        },
      };
    }

    case MIN_LENGTH_PASS: {
      return {
        ...state,
        modalUserEdit: {
          ...state.modalUserEdit,
          userMinLenghtPass: action.minLength,
        },
      };
    }

    case CLOSE_MODAL_EDIT: {
      return {
        ...state,
        modalUserEdit: {
          ...state.modalUserEdit,
          isRun: false,
          userId: null,
          userLogin: null,
          userPass: "",
          userFIO: "",
          userPassResponse: null,
        },
      };
    }
    case RUN_MODAL_DELETE: {
      return {
        ...state,
        modalUserDelete: {
          ...state.modalUserEdit,
          isRun: true,
          userId: action.userData.id,
          userLogin: action.userData.login,
        },
      };
    }
    case CLOSE_MODAL_DELETE: {
      return {
        ...state,
        modalUserDelete: {
          isRun: false,
          userId: null,
          userLogin: null,
          userPass: null,
        },
      };
    }
    case СHECK_EDIT_USER_NEW: {
      var fio = false;
      var minLengthPassword = false;

      if (
        state.modalUserEdit.userMinLenghtPass <=
        state.modalUserEdit.userPass.length
      ) {
        minLengthPassword = true;
      }
      if (state.modalUserEdit.userFIO) {
        fio = true;
      }
      if (minLengthPassword && fio) {
        debugger;
        return {
          ...state,
          modalUserEdit: {
            ...state.modalUserEdit,
            formValidation: {
              errMinLengthPass: minLengthPassword,
              errEmptyFIO: fio,
            },
            isCheckedAddUserNew: true,
          },
        };
      } else {
        return {
          ...state,
          modalUserEdit: {
            ...state.modalUserEdit,
            formValidation: {
              errMinLengthPass: minLengthPassword,
              errEmptyFIO: fio,
            },
            isCheckedAddUserNew: false,
          },
        };
      }
    }
    default:
      return state;
  }
};

export const searchUserAC = (
  id,
  login,
  email,
  level,
  telephone,
  comment,
  fio,
  quota,
  isLocked
) => ({
  type: SEARCH_USER,
  usersList: {
    id,
    login,
    email,
    level,
    telephone,
    comment,
    fio,
    quota,
    isLocked,
  },
});
export const areaUserSearchAC = (areaUserSearchBody) => ({
  type: AREA_USER_SEARCH,
  areaUserSearchBody: areaUserSearchBody,
});
export const lockUserAC = (lockUserId) => ({
  type: LOCK_USER,
  lockUserId: lockUserId,
});
export const unLockUserAC = (unLockUserId) => ({
  type: UNLOCK_USER,
  unLockUserId: unLockUserId,
});
export const deleteUserAC = (deleteUserId) => ({
  type: DELETE_USER,
  deleteUserId: deleteUserId,
});

export const editUserAC = (userData) => ({
  type: EDIT_USER,
  userData: userData,
});
export const newUserPassAC = (passResponse) => ({
  type: NEW_USER_PASS,
  passResponse: passResponse,
  passClear: "",
});

export const modalUserEditAC = (editModalData) => ({
  type: RUN_MODAL_EDIT,
  editModalData: editModalData,
});
export const emailEditAC = (email) => ({
  type: EMAIL_EDIT,
  email: email,
});
export const levelEditAC = (level) => ({
  type: LEVEL_EDIT,
  level: level,
});
export const passEditAC = (pass) => ({
  type: PASS_EDIT,
  pass: pass,
});
export const fioEditAC = (fio) => ({
  type: FIO_EDIT,
  fio: fio,
});
export const quotaEditAC = (quota) => ({
  type: QUOTA_EDIT,
  quota: quota,
});
export const telephoneEditAC = (telephone) => ({
  type: TELEPHONE_EDIT,
  telephone: telephone,
});
export const commentEditAC = (comment) => ({
  type: COMMENT_EDIT,
  comment: comment,
});
export const minLengthPassEditAC = (minLength) => ({
  type: MIN_LENGTH_PASS,
  minLength: minLength,
});
export const checkEditUserAC = () => ({
  type: СHECK_EDIT_USER_NEW,
});
export const closeModalUserEditAC = () => ({
  type: CLOSE_MODAL_EDIT,
});
export const modalUserDeleteAC = (id, login) => ({
  type: RUN_MODAL_DELETE,
  userData: { id, login },
});
export const closeModalUserDeleteAC = () => ({
  type: CLOSE_MODAL_DELETE,
});
export const getUserListAC = (
  id,
  login,
  email,
  level,
  telephone,
  comment,
  fio,
  quota,
  isLocked
) => ({
  type: GET_USER_LIST,
  usersList: {
    id,
    login,
    email,
    level,
    telephone,
    comment,
    fio,
    quota,
    isLocked,
  },
});
export const clearUserListAC = () => ({ type: CLEAR_USER_LIST });
export const isFetchingAC = (boolIsFetching) => ({
  type: IS_FETCHING,
  boolIsFetching: boolIsFetching,
});

export default userManagementReducer;
