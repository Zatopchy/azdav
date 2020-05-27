import { createStore, combineReducers } from "redux";
import headerReducer from "./reducers/header-reducer";
import userManagementReducer from "./reducers/userManagement-reducer";
import settingsReducer from "./reducers/settings-reducer";
import authReducer from "./reducers/auth-reducer";
import addUserReducer from "./reducers/addUser-reducer";
import importReducer from "./reducers/import-reducer";

let redusers = combineReducers({
  header: headerReducer,
  importPage: importReducer,
  userManagementPage: userManagementReducer,
  settingsPage: settingsReducer,
  authPage: authReducer,
  addUserPage: addUserReducer,
});

let store = createStore(
  redusers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
window.store = store;
