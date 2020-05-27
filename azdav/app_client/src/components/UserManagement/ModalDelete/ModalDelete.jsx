import React from "react";

const ModalDelete = (props) => {
  let delUserId = props.delUserId;
  let delUserLogin = props.delUserLogin;

  let onDeleteUser = (delUserId, delUserLogin) => {
    var userId = delUserId;
    var userLogin = delUserLogin;
    props.deleteUserOne(props.deleteUser, userId, userLogin);
    props.closeModalUserDelete();
  };

  let onCloseModalDelete = () => {
    props.closeModalUserDelete();
  };
  return (
    <>
      <div className="modal fade show d-block" id="delUserAlert" tabindex="-1">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => onCloseModalDelete()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body alert-danger font-weight-bold">
              <p>
                Вы уверены, что хотите удалить пользователя
                <span className="text-dark"> {delUserLogin}</span> ?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => onCloseModalDelete()}
              >
                Закрыть
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onDeleteUser(delUserId, delUserLogin);
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ModalDelete;
