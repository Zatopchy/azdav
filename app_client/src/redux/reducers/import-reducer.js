const UPDATE_NEW_IMPORT_BODY = "UPDATE_NEW_IMPORT_BODY";
const LOAD_IMPORT_NEW = "LOAD_IMPORT_NEW";

let initialState = {
  newImportBody: "",
};

const importReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_IMPORT_BODY: {
      return {
        ...state,
        newImportBody: action.newImportBody,
      };
    }
    case LOAD_IMPORT_NEW: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const updateNewImportChangeAC = (newImportBody) => ({
  type: UPDATE_NEW_IMPORT_BODY,
  newImportBody: newImportBody,
});

export const loadImportNewAC = () => ({
  type: LOAD_IMPORT_NEW,
});

export default importReducer;
