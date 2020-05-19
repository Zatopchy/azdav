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
  modalUserDeleteAC,
  closeModalUserDeleteAC,
  modalUserEditAC,
  closeModalUserEditAC,
  emailEditAC,
  levelEditAC,
  passEditAC,
  fioEditAC,
  telephoneEditAC,
  commentEditAC,
  newUserPassAC,
  minLengthPassEditAC,
  checkEditUserAC,
} from "../../redux/reducers/userManagement-reducer";
import { connect } from "react-redux";
import UserManagement from "./UserManagement";
import {
  getUsers,
  searchUserOne,
  lockUserOne,
  unLockUserOne,
  deleteUserOne,
  editModalRun,
  editUserOne,
  newPassUserOne,
  getEditUserSettings,
} from "../../api/userManagementAPI";
import { withRouter } from "react-router-dom";

class UserManagementContainer extends Component {
  componentDidMount() {
    debugger;
    this.props.clearUserList();
    getUsers(this.props.getUserList, this.props.isFetching);
    getEditUserSettings(this.props.minLengthPassEdit);
  }

  render() {
    return (
      <div>
        <UserManagement
          {...this.props}
          searchUserOne={searchUserOne}
          lockUserOne={lockUserOne}
          unLockUserOne={unLockUserOne}
          deleteUserOne={deleteUserOne}
          getUsers={getUsers}
          editModalRun={editModalRun}
          editUserOne={editUserOne}
          newPassUserOne={newPassUserOne}
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
  modalUserEdit: modalUserEditAC,
  emailEdit: emailEditAC,
  levelEdit: levelEditAC,
  passEdit: passEditAC,
  fioEdit: fioEditAC,
  telephoneEdit: telephoneEditAC,
  commentEdit: commentEditAC,
  minLengthPassEdit: minLengthPassEditAC,
  checkEditUser: checkEditUserAC,
  closeModalUserEdit: closeModalUserEditAC,
  modalUserDelete: modalUserDeleteAC,
  newUserPass: newUserPassAC,
  closeModalUserDelete: closeModalUserDeleteAC,
})(WithUrlDataContainerComponent);
