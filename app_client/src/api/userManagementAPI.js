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
          res.data[i].fio,
          res.data[i].quota,
          res.data[i].isLocked
        );
      } else if (!_userLogin) {
        _getUserList(
          res.data[i].id,
          res.data[i].login,
          res.data[i].email,
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
  debugger;

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
