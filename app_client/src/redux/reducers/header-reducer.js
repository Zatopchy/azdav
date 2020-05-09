const EXPORT_DATA = "EXPORT_DATA";

let initialState = () => {};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_DATA: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const exportDataAC = () => ({ type: EXPORT_DATA });

export default headerReducer;
