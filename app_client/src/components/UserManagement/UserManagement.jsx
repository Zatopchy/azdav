import React from "react";
import s from "./UserManagement.module.css";
import UserItem from "./UserItem/UserItem";
import { NavLink } from "react-router-dom";

const UserManagement = (props) => {
  let state = props.userManagementPage;

  let newAreaUserSearchBody = state.areaUserSearch;

  let isFetching = state.isFetching;

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

  let onEditUser = (e) => {
    props.editUser();
  };

  let onDeleteUser = (e) => {
    props.deleteUser();
  };

  let onLockUser = (e) => {
    props.lockUser();
  };

  let userslist = state.users.map((p) => (
    <tr>
      <UserItem
        key={p.userId}
        userLogin={p.userLogin}
        userEmail={p.userEmail}
        userFIO={p.userFIO}
        userQuota={p.userQuota}
        userLock={p.userLock}
      />
      <th>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={onLockUser}
            className={`fas fa-ban mr-4 ${p.userLock ? s.block : null}`}
          ></i>
        </NavLink>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={onLockUser}
            value={p.userId}
            className={`fas fa-unlock mr-4 ${p.userLock ? null : s.unlock}`}
          ></i>
        </NavLink>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={onEditUser}
            value={p.userId}
            className={`fas fa-pen mr-4 ${s.edit}`}
          ></i>
        </NavLink>
        <NavLink className={s.userLink} to={`/users/${p.userId}`}>
          <i
            onClick={onDeleteUser}
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
                  <th scope="col">Квота</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>{userslist}</tbody>
            </table>
            <div className="text-center">
              {isFetching == true ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
