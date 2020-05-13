import React, { Component } from "react";
import {
  areaUserSearchAC,
  lockUserAC,
  editUserAC,
  deleteUserAC,
  searchUserAC,
  getUserListAC,
  clearUserListAC,
  isFetchingAC,
} from "../../redux/reducers/userManagement-reducer";
import { connect } from "react-redux";
import UserManagement from "./UserManagement";
import { getUsers, postData, searchUserOne } from "../../api/userManagementAPI";
import { withRouter } from "react-router-dom";

class UserManagementContainer extends Component {
  componentDidMount() {
    this.props.clearUserList();
    getUsers(this.props.getUserList, this.props.isFetching);

    postData();
  }

  render() {
    return (
      <div>
        <UserManagement {...this.props} searchUserOne={searchUserOne} />
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    userManagementPage: state.userManagementPage,
  };
};

let WithUrlDataContainerComponent = withRouter(UserManagementContainer);

export default UserManagementContainer = connect(mapStateToProps, {
  searchUser: searchUserAC,
  updateAreaUserSearch: areaUserSearchAC,
  lockUser: lockUserAC,
  editUser: editUserAC,
  deleteUser: deleteUserAC,
  getUserList: getUserListAC,
  clearUserList: clearUserListAC,
  isFetching: isFetchingAC,
})(WithUrlDataContainerComponent);
