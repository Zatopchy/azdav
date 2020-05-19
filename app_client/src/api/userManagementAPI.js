import * as axios from "axios";

const instanceUserManagement = axios.create({
  baseURL: "/userManagementAPI/",
});

export const getUsers = (_getUserList, _isFetching) => {
  _isFetching(true);
  return instanceUserManagement.get(`getUser`).then((res) => {
    for (let i = 0; i !== res.data.length; i++) {
      _getUserList(
        res.data[i].id,
        res.data[i].login,
        res.data[i].email,
        res.data[i].level,
        res.data[i].telephone,
        res.data[i].comment,
        res.data[i].fio,
        res.data[i].quota,
        res.data[i].isLocked
      );
    }
    _isFetching(false);
  });
};

export const searchUserOne = (
  _searchUser,
  _getUserList,
  _clearUserList,
  _isFetching,
  _userLogin
) => {
  _isFetching(true);
  return instanceUserManagement.get(`getUser`).then((res) => {
    debugger;
    _clearUserList();
    for (let i = 0; i !== res.data.length; i++) {
      if (res.data[i].login === _userLogin) {
        _searchUser(
          res.data[i].id,
          res.data[i].login,
          res.data[i].email,
          res.data[i].level,
          res.data[i].telephone,
          res.data[i].comment,
          res.data[i].fio,
          res.data[i].quota,
          res.data[i].isLocked
        );
      } else if (!_userLogin) {
        _getUserList(
          res.data[i].id,
          res.data[i].login,
          res.data[i].email,
          res.data[i].level,
          res.data[i].telephone,
          res.data[i].comment,
          res.data[i].fio,
          res.data[i].quota,
          res.data[i].isLocked
        );
      }
      _isFetching(false);
    }
  });
};

export const lockUserOne = (_lockUser, _userId, _userLogin) => {
  debugger;

  return instanceUserManagement
    .post(`lockUser`, {
      lockUserId: _userId,
      lockUserLogin: _userLogin,
    })
    .then(function (res) {
      debugger;
      _lockUser(_userId);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const unLockUserOne = (_unLockUser, _userId, _userLogin) => {
  debugger;

  return instanceUserManagement
    .post(`unLockUser`, {
      unLockUserId: _userId,
      unLockUserLogin: _userLogin,
    })
    .then(function (res) {
      debugger;
      _unLockUser(_userId);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteUserOne = (_deleteUser, _userId, _userLogin) => {
  return instanceUserManagement
    .post(`deleteUser`, {
      deleteUserId: _userId,
      deleteUserLogin: _userLogin,
    })
    .then(function (res) {
      debugger;
      _deleteUser(_userId);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editModalRun = (_editModalRun, _checkEditUser, _userId) => {
  debugger;
  return instanceUserManagement
    .post(`editModalRun`, {
      userId: _userId,
    })
    .then(function (res) {
      // console.log(res.data.login);
      _editModalRun(res.data);
      _checkEditUser();
      debugger;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const editUserOne = (_editUser, _userData) => {
  debugger;
  return instanceUserManagement
    .post(`editUser`, {
      user: _userData,
    })
    .then(function (res) {
      // console.log(res.data.login);
      _editUser(res.data);
      debugger;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const newPassUserOne = (_newUserPass, _userLogin, _userPass) => {
  debugger;
  return instanceUserManagement
    .post(`newUserPass`, {
      login: _userLogin,
      pass: _userPass,
    })
    .then(function (res) {
      _newUserPass(res.data);
      debugger;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getEditUserSettings = (_setMinLengthPass) => {
  debugger;
  return instanceUserManagement.get(`getSettings`).then((res) => {
    debugger;
    var dataSettings = res.data.settingsEditUser;
    _setMinLengthPass(dataSettings.minLengthPass);
  });
};
