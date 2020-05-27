const UPDATE_NEW_IMPORT_BODY = "UPDATE_NEW_IMPORT_BODY";
const LOAD_IMPORT_NEW = "LOAD_IMPORT_NEW";

let initialState = {
  newImportBody: "",
  responseImportBody: "",
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
        responseImportBody: action.responseImportBody,
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

export const loadImportNewAC = (responseImportBody) => ({
  type: LOAD_IMPORT_NEW,
  responseImportBody: responseImportBody,
});

export default importReducer;
