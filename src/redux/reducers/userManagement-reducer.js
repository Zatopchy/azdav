const LOCK_USER = "LOCK_USER";
const EDIT_USER = "EDIT_USER";
const AREA_USER_SEARCH = "AREA_USER_SEARCH";
const SEARCH_USER = "SEARCH_USER";
const DELETE_USER = "DELETE_USER";

let initialState = {
  users: [
    {
      userId: "1",
      userLogin: "Sanya123",
      userEmail: "Sanya@mail.ru",
      userFIO: "Александр Георгиевич Кабачков",
      userQuota: "1024",
      userLock: true,
    },
    {
      userId: "2",
      userLogin: "Marysa",
      userEmail: "Marysa@mail.ru",
      userFIO: "Мария Валерьевна Прохорова",
      userQuota: "2048",
      userLock: true,
    },
  ],
  areaUserSearch: "",
};

const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER: {
      return {
        ...state,
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
    default:
      return state;
  }
};

export const searchUserAC = () => ({ type: SEARCH_USER });
export const areaUserSearchAC = (areaUserSearchBody) => ({
  type: AREA_USER_SEARCH,
  areaUserSearchBody: areaUserSearchBody,
});
export const lockUserAC = () => ({ type: LOCK_USER });
export const editUserAC = () => ({ type: EDIT_USER });
export const deleteUserAC = () => ({ type: DELETE_USER });

export default userManagementReducer;
