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
  unLockUserAC,
} from "../../redux/reducers/userManagement-reducer";
import { connect } from "react-redux";
import UserManagement from "./UserManagement";
import {
  getUsers,
  searchUserOne,
  lockUserOne,
  unLockUserOne,
} from "../../api/userManagementAPI";
import { withRouter } from "react-router-dom";

class UserManagementContainer extends Component {
  componentDidMount() {
    debugger;
    // console.log(this.props.match.params.userId);
    this.props.clearUserList();
    getUsers(this.props.getUserList, this.props.isFetching);
  }

  render() {
    return (
      <div>
        <UserManagement
          {...this.props}
          searchUserOne={searchUserOne}
          lockUserOne={lockUserOne}
          unLockUserOne={unLockUserOne}
          getUsers={getUsers}
        />
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
  unLockUser: unLockUserAC,
  editUser: editUserAC,
  deleteUser: deleteUserAC,
  getUserList: getUserListAC,
  clearUserList: clearUserListAC,
  isFetching: isFetchingAC,
})(WithUrlDataContainerComponent);
