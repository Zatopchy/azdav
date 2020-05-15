const LOCK_USER = "LOCK_USER";
const UNLOCK_USER = "UNLOCK_USER";
const EDIT_USER = "EDIT_USER";
const AREA_USER_SEARCH = "AREA_USER_SEARCH";
const SEARCH_USER = "SEARCH_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_LIST = "GET_USER_LIST";
const CLEAR_USER_LIST = "CLEAR_USER_LIST";
const IS_FETCHING = "IS_FETCHING";
const RUN_MODAL_DELETE = "RUN_MODAL_DELETE";
const CLOSE_MODAL_DELETE = "CLOSE_MODAL_DELETE";

let initialState = {
  users: [],
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
      return {
        ...state,
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
    case RUN_MODAL_DELETE: {
      return {
        ...state,
        modalUserDelete: {
          isRun: true,
          userId: action.userData.id,
          userLogin: action.userData.login,
        },
      };
    }
    case CLOSE_MODAL_DELETE: {
      return {
        ...state,
        modalUserDelete: { isRun: false, userId: null, userLogin: null },
      };
    }
    default:
      return state;
  }
};

export const searchUserAC = (id, login, email, fio, quota, isLocked) => ({
  type: SEARCH_USER,
  usersList: { id, login, email, fio, quota, isLocked },
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
export const editUserAC = () => ({ type: EDIT_USER });
export const deleteUserAC = (deleteUserId) => ({
  type: DELETE_USER,
  deleteUserId: deleteUserId,
});
export const modalUserDeleteAC = (id, login) => ({
  type: RUN_MODAL_DELETE,
  userData: { id, login },
});
export const closeModalUserDeleteAC = () => ({
  type: CLOSE_MODAL_DELETE,
});
export const getUserListAC = (id, login, email, fio, quota, isLocked) => ({
  type: GET_USER_LIST,
  usersList: { id, login, email, fio, quota, isLocked },
});
export const clearUserListAC = () => ({ type: CLEAR_USER_LIST });
export const isFetchingAC = (boolIsFetching) => ({
  type: IS_FETCHING,
  boolIsFetching: boolIsFetching,
});

export default userManagementReducer;
