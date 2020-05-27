import * as axios from "axios";

const instanceAddUsers = axios.create({
  baseURL: "/addUserAPI/",
});

export const getAddUserSettings = (_getQuota, _setMinLengthPass) => {
  return instanceAddUsers.get(`getSettings`).then((res) => {
    var dataSettings = res.data.settingsAddUser;
    _getQuota(dataSettings.quota);
    _setMinLengthPass(dataSettings.minLengthPass);
  });
};

export const createUserNew = (
  _addUserNew,
  _checkAddUserNew,
  _userId,
  _userLogin,
  _userPass,
  _userRepeatPass,
  _userEmail,
  _userLevel,
  _userTelephone,
  _userComment,
  _userFIO,
  _userQuota
) => {
  return instanceAddUsers
    .post(`createUser`, {
      postUserId: _userId,
      postUserLogin: _userLogin,
      postUserPass: _userPass,
      postUserRepeatPass: _userRepeatPass,
      postUserEmail: _userEmail,
      postUserLevel: _userLevel,
      postUserTelephone: _userTelephone,
      postUserComment: _userComment,
      postUserFIO: _userFIO,
      postUserQuota: _userQuota,
    })
    .then(function (response) {
      _addUserNew();
      _checkAddUserNew();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
