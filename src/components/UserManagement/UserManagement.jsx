import React from "react";
import s from "./UserManagement.module.css";
import UserItem from "./UserItem/UserItem";

const UserManagement = (props) => {
  let state = props.userManagementPage;

  let newAreaUserSearchBody = state.areaUserSearch;

  let onNewAreaUserSearchBodyChange = (e) => {
    let areaUserSearchBody = e.target.value;
    props.updateAreaUserSearch(areaUserSearchBody);
  };

  let onSearchUser = (e) => {
    props.searchUser();
  };

  let onEditUser = (e) => {
    props.editUser();
  };

  let onDeleteUser = (e) => {
    props.deleteUser();
  };

  let onlockUser = (e) => {
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
        <i
          onClick={onlockUser}
          value={p.userId}
          className="fas fa-ban mr-4"
        ></i>
        <i
          onClick={onlockUser}
          value={p.userId}
          className="fas fa-unlock mr-4"
        ></i>
        <i
          onClick={onEditUser}
          value={p.userId}
          className={`fas fa-pen mr-4 ${s.edit}`}
        ></i>
        <i
          onClick={onDeleteUser}
          value={p.userId}
          className={`fas fa-trash-alt ${s.trash}`}
        ></i>
      </th>
    </tr>
  ));

  return (
    <div>
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
              type="submit"
              onClick={onSearchUser}
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
