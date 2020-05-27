import React from "react";

const ModalEdit = (props) => {
  let editUserId = props.state.userId;
  let editUserLogin = props.state.userLogin;
  let editUserPass = props.state.userPass;
  let editUserPassResponse = props.state.userPassResponse;
  let editUserEmail = props.state.userEmail;
  let editUserLevel = props.state.userLevel;
  let editUserQuota = props.state.userQuota;
  let editUserTelephone = props.state.userTelephone;
  let editUserComment = props.state.userComment;
  let editUserFIO = props.state.userFIO;
  let newMinLengthPass = props.state.userMinLenghtPass;
  let newErrEmptyFIO = props.state.formValidation.errEmptyFIO;
  let newErrMinLengthPass = props.state.formValidation.errMinLengthPass;
  debugger;
  let onEditUserSave = () => {
    console.log(newErrEmptyFIO);
    debugger;
    if (newErrEmptyFIO) {
      let userData = {
        userId: editUserId,
        userLogin: editUserLogin,
        userEmail: editUserEmail,
        userLevel: editUserLevel,
        userQuota: editUserQuota,
        userTelephone: editUserTelephone,
        userComment: editUserComment,
        userFIO: editUserFIO,
      };

      props.editUserOne(props.editUser, userData);
      props.closeModalUserEdit();
    }
  };

  let onEmailChange = (e) => {
    let email = e.target.value;
    props.emailEdit(email);
  };

  let onLevelChange = (e) => {
    let level = e.target.value;
    props.levelEdit(level);
  };

  let onPassChange = (e) => {
    let pass = e.target.value;
    props.passEdit(pass);
    props.checkEditUser();
  };

  let onFIOChange = (e) => {
    let fio = e.target.value;
    props.fioEdit(fio);
    props.checkEditUser();
  };

  let onQuotaChange = (e) => {
    let quota = e.target.value;
    props.quotaEdit(quota);
  };

  let onTelephoneChange = (e) => {
    let telephone = e.target.value;
    props.telephoneEdit(telephone);
  };

  let onCommentChange = (e) => {
    let comment = e.target.value;
    props.commentEdit(comment);
  };

  let onNewPassClick = () => {
    if (newErrMinLengthPass) {
      let userLogin = editUserLogin;
      let userPass = editUserPass;
      props.newPassUserOne(props.newUserPass, userLogin, userPass);
    }
  };

  let onCloseModalEdit = () => {
    props.closeModalUserEdit();
  };
  return (
    <>
      <div className="modal fade show d-block" id="editUserAlert" tabindex="-1">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="bg-primary text-white rounded pl-2 pr-2">
                Пользователь: {editUserLogin}
              </span>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => onCloseModalEdit()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body container-fluid font-weight-bold">
              <div className="row">
                <div className="alert-primary col-md-6">
                  <form>
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        class="form-control"
                        aria-describedby="emailHelp"
                        value={editUserEmail}
                        onChange={onEmailChange}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Уровень доступа</label>
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        value={editUserLevel}
                        onChange={onLevelChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="alert-primary col-md-6">
                  <form>
                    <div class="form-group">
                      <label>Новый пароль</label>
                      <input
                        type="password"
                        className={`form-control ${
                          newErrMinLengthPass ? null : `is-invalid`
                        }`}
                        onChange={onPassChange}
                        placeholder="Необязательный атрибут"
                        value={editUserPass}
                      />
                      <div className="invalid-feedback">
                        Длина пароля должна быть не менее {newMinLengthPass}{" "}
                        символов
                      </div>
                    </div>

                    <div
                      class="btn btn-warning"
                      onClick={() => onNewPassClick()}
                    >
                      Обновить пароль
                    </div>
                 
                    <div className={`badge ${editUserPassResponse === true ? `badge-danger` : `badge-success`} ml-2 ${editUserPassResponse === null ? `d-none` : null}`}>
                    {editUserPassResponse === true ? `Перед обновлением пароля разблокируйте пользователя` : `Пароль обновлён`}
                    </div>
                  </form>
                </div>
              </div>
              <div className="alert-primary row">
                <div className="col-md-7 m-auto">
                  <div class="form-group">
                    <label>ФИО</label>
                    <input
                      type="text"
                      className={`form-control ${
                        newErrEmptyFIO ? null : `is-invalid`
                      }`}
                      value={editUserFIO}
                      onChange={onFIOChange}
                    />
                    <div className="invalid-feedback">Пустое поле</div>
                  </div>
                </div>
                <div className="col-md-7 m-auto">
                  <div class="form-group">
                    <label>Квота</label>
                    <input
                      type="number"
                      class="form-control"
                      value={editUserQuota}
                      onChange={onQuotaChange}
                    />
                  </div>
                </div>
                <div className="col-md-7 m-auto">
                  <div class="form-group">
                    <label>Телефон</label>
                    <input
                      type="tel"
                      class="form-control"
                      value={editUserTelephone}
                      onChange={onTelephoneChange}
                    />
                  </div>
                </div>
                <div className="col-md-7 m-auto">
                  <div class="form-group">
                    <label>Комментарий</label>
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="emailHelp"
                      value={editUserComment}
                      onChange={onCommentChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => onCloseModalEdit()}
              >
                Закрыть
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  onEditUserSave();
                }}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ModalEdit;
