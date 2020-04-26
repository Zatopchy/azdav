import React from "react";
import s from "./AddUsers.module.css";

const AddUsers = (props) => {
  let state = props.addUserPage;

  let newLoginBody = state.userLogin;
  let newPassBody = state.userPass;
  let newRepeatPassBody = state.userRepeatPass;
  let newEmailBody = state.userEmail;
  let newFIOBody = state.userFIO;
  let newQuotaBody = state.userQuota;

  let onAddUserNew = (e) => {
    props.addUserNew();
  };

  let onNewLoginChange = (e) => {
    let loginBody = e.target.value;
    props.updateNewLoginChange(loginBody);
  };

  let onNewPassChange = (e) => {
    let passBody = e.target.value;
    props.updateNewPassChange(passBody);
  };

  let onNewRepeatPassChange = (e) => {
    let repeatPassBody = e.target.value;
    props.updateNewRepeatPassChange(repeatPassBody);
  };

  let onNewEmailChange = (e) => {
    let emailBody = e.target.value;
    props.updateNewEmailChange(emailBody);
  };

  let onNewFIOChange = (e) => {
    let fioBody = e.target.value;
    props.updateNewFIOChange(fioBody);
  };

  let onNewQuotaChange = (e) => {
    let quotaBody = e.target.value;
    props.updateNewQuotaChange(quotaBody);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 m-auto">
          <form className="border border-dark p-4">
            <div
              className="alert alert-primary col-sm-12 col-form-label text-center font-weight-bold"
              role="alert"
            >
              Добавить пользователя:
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Логин:</label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  value={newLoginBody}
                  onChange={onNewLoginChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Пароль:</label>
              <div className="col-sm-7">
                <input
                  type="password"
                  className="form-control"
                  value={newPassBody}
                  onChange={onNewPassChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-form-label">
                Пароль(ещё раз):
              </label>
              <div className="col-sm-7">
                <input
                  type="password"
                  className="form-control"
                  value={newRepeatPassBody}
                  onChange={onNewRepeatPassChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-form-label">E-mail:</label>
              <div className="col-sm-7">
                <input
                  type="email"
                  className="form-control"
                  id="inputPassword"
                  placeholder="example@mail.ru"
                  value={newEmailBody}
                  onChange={onNewEmailChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-form-label">ФИО</label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Иванов Иван Иванович"
                  id="inputFIO"
                  value={newFIOBody}
                  onChange={onNewFIOChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Квота</label>
              <div className="col-sm-7">
                <input
                  type="number"
                  min="1"
                  max="15"
                  placeholder="Мб"
                  className="form-control"
                  id="inputQuota"
                  value={newQuotaBody}
                  onChange={onNewQuotaChange}
                />
              </div>
            </div>

            <div className="col-sm-7 m-auto">
              <input
                type="submit"
                className="form-control btn bg-success text-white"
                value="Добавить"
                onClick={onAddUserNew}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
