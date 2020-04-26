import React from "react";
import { connect } from "react-redux";
import UserManagement from "./UserManagement";
import {
  areaUserSearchAC,
  lockUserAC,
  editUserAC,
  deleteUserAC,
  searchUserAC,
} from "../../redux/reducers/userManagement-reducer";

let mapStateToProps = (state) => {
  return {
    userManagementPage: state.userManagementPage,
  };
};

const UserManagementContainer = connect(mapStateToProps, {
  searchUser: searchUserAC,
  updateAreaUserSearch: areaUserSearchAC,
  lockUser: lockUserAC,
  editUser: editUserAC,
  deleteUser: deleteUserAC,
})(UserManagement);

export default UserManagementContainer;
