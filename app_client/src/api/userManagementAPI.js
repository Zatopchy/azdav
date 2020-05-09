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

export const lockUserOne = (_lockUser, userId) => {
  return instanceUserManagement.get(`getUser`).then((res) => {
    for (let i = 0; i !== res.data.length; i++) {
      if (res.data[i].id === userId) {
        _lockUser(res.data[i].login);
      }
    }
  });
};

export const postData = () => {
  return instanceUserManagement
    .post(`search`, {
      post: "Фредди",
    })
    .then(function (response) {
      console.log(response.data); // Это полноценный ответ сервера на POST запрос
    })
    .catch(function (error) {
      console.log(error);
    });
};
