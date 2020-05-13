const LOCK_USER = "LOCK_USER";
const EDIT_USER = "EDIT_USER";
const AREA_USER_SEARCH = "AREA_USER_SEARCH";
const SEARCH_USER = "SEARCH_USER";
const DELETE_USER = "DELETE_USER";
const GET_USER_LIST = "GET_USER_LIST";
const CLEAR_USER_LIST = "CLEAR_USER_LIST";
const IS_FETCHING = "IS_FETCHING";

let initialState = {
  users: [],
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
        userLock: action.lockUserLogin,
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
export const lockUserAC = (lockUserLogin) => ({
  type: LOCK_USER,
  lockUserLogin: lockUserLogin,
});
export const editUserAC = () => ({ type: EDIT_USER });
export const deleteUserAC = () => ({ type: DELETE_USER });
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
