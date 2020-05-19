import React from "react";
import s from "./UserManagement.module.css";
import UserItem from "./UserItem/UserItem";
import { NavLink } from "react-router-dom";
import ModalDelete from "./ModalDelete/ModalDelete";
import ModalEdit from "./ModalEdit/ModalEdit";

const UserManagement = (props) => {
  let state = props.userManagementPage;

  let newAreaUserSearchBody = state.areaUserSearch;
  let isFetching = state.isFetching;
  let isRunModalUserEdit = state.modalUserEdit.isRun;
  let isRunModalUserDelete = state.modalUserDelete.isRun;
  let delUserId = state.modalUserDelete.userId;
  let delUserLogin = state.modalUserDelete.userLogin;

  let onNewAreaUserSearchBodyChange = (e) => {
    let areaUserSearchBody = e.target.value;
    props.updateAreaUserSearch(areaUserSearchBody);
  };

  let onSearchUser = (userLogin) => {
    props.searchUserOne(
      props.searchUser,
      props.getUserList,
      props.clearUserList,
      props.isFetching,
      userLogin.newAreaUserSearchBody
    );
  };

  let onDeleteModalCall = (delUserId, delUserLogin) => {
    var userId = delUserId;
    var userLogin = delUserLogin;
    props.modalUserDelete(userId, userLogin);
  };

  let onEditModalCall = (editUserId) => {
    var userId = editUserId;
    props.editModalRun(props.modalUserEdit, props.checkEditUser, userId);
  };

  let onLockUser = (lockUserId, lockUserLogin) => {
    var userId = lockUserId;
    var userLogin = lockUserLogin;
    props.lockUserOne(props.lockUser, userId, userLogin);
  };

  let onUnLockUser = (unlockUserId, unLockUserLogin) => {
    var userIdInNumber = unlockUserId;
    var userLogin = unLockUserLogin;
    props.unLockUserOne(props.unLockUser, userIdInNumber, userLogin);
  };

  let userslist = state.users.map((p) => (
    <tr>
      <UserItem
        key={p.userId}
        userLogin={p.userLogin}
        userEmail={p.userEmail}
        userLevel={p.userLevel}
        userTelephone={p.userTelephone}
        userComment={p.userComment}
        userFIO={p.userFIO}
        userQuota={p.userQuota}
        userLock={p.userLock}
      />
      <th>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={() => onLockUser(p.userId, p.userLogin)}
            className={`fas fa-ban mr-4 ${
              p.userLock === "true" ? s.block : null
            }`}
          ></i>
        </NavLink>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={() => onUnLockUser(p.userId, p.userLogin)}
            value={p.userId}
            className={`fas fa-unlock mr-4 ${
              p.userLock === "true" ? null : s.unlock
            }`}
          ></i>
        </NavLink>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={() => onEditModalCall(p.userId, p.userLogin)}
            value={p.userId}
            className={`fas fa-pen mr-4 ${s.edit}`}
          ></i>
        </NavLink>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={() => onDeleteModalCall(p.userId, p.userLogin)}
            value={p.userId}
            className={`fas fa-trash-alt ${s.trash}`}
          ></i>
        </NavLink>
      </th>
    </tr>
  ));
  return (
    <div>
      <p>{state.responseToPost}</p>
      <main className={`container-fluid bg-light ${s.main}`}>
        <div className="row m-0">
          <form className="form-inline mt-2 ml-auto">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Введите логин"
              aria-label="Search"
              value={newAreaUserSearchBody}
              onChange={onNewAreaUserSearchBodyChange}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={() => onSearchUser({ newAreaUserSearchBody })}
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
          <div className={`col-md-12 p-0 mt-3 ${s.content}`}>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Логин</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">ФИО</th>
                  <th scope="col">Доступ</th>
                  <th scope="col">Телефон</th>
                  <th scope="col">Комментарий</th>
                  <th scope="col">Квота</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>{userslist}</tbody>
            </table>
            <div className="text-center">
              {isFetching === true ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={isRunModalUserDelete ? `d-block` : `d-none`}>
          <ModalDelete
            deleteUser={props.deleteUser}
            deleteUserOne={props.deleteUserOne}
            closeModalUserDelete={props.closeModalUserDelete}
            delUserId={delUserId}
            delUserLogin={delUserLogin}
          />
        </div>

        <div className={isRunModalUserEdit ? `d-block` : `d-none`}>
          <ModalEdit
            state={state.modalUserEdit}
            editUserOne={props.editUserOne}
            editUser={props.editUser}
            minLengthPassEdit={props.minLengthPassEditAC}
            checkEditUser={props.checkEditUser}
            emailEdit={props.emailEdit}
            levelEdit={props.levelEdit}
            passEdit={props.passEdit}
            fioEdit={props.fioEdit}
            telephoneEdit={props.telephoneEdit}
            commentEdit={props.commentEdit}
            newUserPass={props.newUserPass}
            newPassUserOne={props.newPassUserOne}
            closeModalUserEdit={props.closeModalUserEdit}
          />
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
