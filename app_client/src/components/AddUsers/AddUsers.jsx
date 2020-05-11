import React from "react";
import s from "./AddUsers.module.css";

const AddUsers = (props) => {
  let state = props.addUserPage;

  let newIdBody = state.userId;
  let newLoginBody = state.userLogin;
  let newPassBody = state.userPass;
  let newRepeatPassBody = state.userRepeatPass;
  let newEmailBody = state.userEmail;
  let newFIOBody = state.userFIO;
  let newQuotaBody = state.userQuota;

  let newErrEmptyLogin = state.formValidation.errEmptyLogin;
  let newErrEmptyFIO = state.formValidation.errEmptyFIO;
  let newErrEmptyQuota = state.formValidation.errEmptyQuota;
  let newErrMinLengthPass = state.formValidation.errMinLengthPass;
  let newErrPassMismatch = state.formValidation.errPassMismatch;
  let newIsCheckedAddUserNew = state.isCheckedAddUserNew;

  let newMinLengthPass = state.userMinLengthPass;

  let onAddUserNew = (e) => {
    debugger;

    if (e.newIsCheckedAddUserNew === true) {
      props.createUserNew(
        props.addUserNew,
        props.checkAddUserNew,
        newIdBody,
        newLoginBody,
        newPassBody,
        newRepeatPassBody,
        newEmailBody,
        newFIOBody,
        newQuotaBody
      );
    }
  };

  let onNewLoginChange = (e) => {
    let loginBody = e.target.value;
    props.updateNewLoginChange(loginBody);
    props.checkAddUserNew();
  };

  let onNewPassChange = (e) => {
    let passBody = e.target.value;
    props.updateNewPassChange(passBody);
    props.checkAddUserNew();
  };

  let onNewRepeatPassChange = (e) => {
    let repeatPassBody = e.target.value;
    props.updateNewRepeatPassChange(repeatPassBody);
    props.checkAddUserNew();
  };

  let onNewEmailChange = (e) => {
    let emailBody = e.target.value;
    props.updateNewEmailChange(emailBody);
  };

  let onNewFIOChange = (e) => {
    let fioBody = e.target.value;
    props.updateNewFIOChange(fioBody);
    props.checkAddUserNew();
  };

  let onNewQuotaChange = (e) => {
    let quotaBody = e.target.value;
    props.updateNewQuotaChange(quotaBody);
    props.checkAddUserNew();
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
                  className={`form-control ${
                    newErrEmptyLogin ? `is-valid` : `is-invalid`
                  }`}
                  value={newLoginBody}
                  onChange={onNewLoginChange}
                />
                <div className="invalid-feedback">Пустое поле</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">Пароль:</label>
              <div className="col-sm-7">
                <input
                  type="password"
                  className={`form-control ${
                    newErrMinLengthPass ? `is-valid` : `is-invalid`
                  }`}
                  value={newPassBody}
                  onChange={onNewPassChange}
                />

                <div className="invalid-feedback">
                  Длина пароля должна быть не менее {newMinLengthPass} символов
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">
                Пароль(ещё раз):
              </label>
              <div className="col-sm-7">
                <input
                  type="password"
                  className={`form-control ${
                    newErrPassMismatch ? `is-valid` : `is-invalid`
                  }`}
                  value={newRepeatPassBody}
                  onChange={onNewRepeatPassChange}
                />
                <div className="invalid-feedback">Пароли не совпадают</div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-5 col-form-label">E-mail:</label>
              <div className="col-sm-7">
                <input
                  type="email"
                  className="form-control is-valid"
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
                  className={`form-control ${
                    newErrEmptyFIO ? `is-valid` : `is-invalid`
                  }`}
                  placeholder="Иванов Иван Иванович"
                  id="inputFIO"
                  value={newFIOBody}
                  onChange={onNewFIOChange}
                />
                <div className="invalid-feedback">Пустое поле</div>
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
                  className={`form-control ${
                    newErrEmptyQuota ? `is-valid` : `is-invalid`
                  }`}
                  id="inputQuota"
                  value={newQuotaBody}
                  onChange={onNewQuotaChange}
                />
                <div className="invalid-feedback">Пустое поле</div>
              </div>
            </div>
            <div className="col-sm-7 m-auto">
              <input
                type="button"
                className="form-control btn bg-success text-white"
                value="Добавить"
                onClick={() => onAddUserNew({ newIsCheckedAddUserNew })}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
