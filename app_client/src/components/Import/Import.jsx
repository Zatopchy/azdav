import React from "react";

const Import = (props) => {
  let state = props.importPage;

  let newImportBody = state.newImportBody;
  let newResponseImportBody = state.responseImportBody;

  let onUpdateNewImportChangeBody = (e) => {
    let newImportChangeBody = e.target.files[0];
    props.updateNewImportChange(newImportChangeBody);
  };

  let onLoadImportNewClick = () => {
    if (newImportBody) {
      props.uploadImportFile(props.loadImportNew, newImportBody);
    }
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="m-auto text-primary font-weight-bold">
          Импорт настроек
        </div>
      </div>
      <div className="row m-0">
        <div className="col-md-3 ml-auto mr-0">
          <form
            action="/upload"
            method="post"
            enctype="multipart/form-data"
            className="form-group was-validated"
          >
            <input
              type="file"
              className="custom-file-input"
              id="validatedCustomFile"
              onChange={onUpdateNewImportChangeBody}
              required
            />

            <label className="custom-file-label" data-browse="Выбрать">
              {newImportBody ? newImportBody.name : null}
            </label>
            <div className="invalid-feedback">Файл не выбран</div>
            <div className="valid-feedback">
              {newImportBody ? newImportBody.size + ` байт` : null}
            </div>
          </form>
          <div className="alert-primary text-center m-4">
            {newResponseImportBody}
          </div>
        </div>
        <div className="col-md-5 p-0 ml-4">
          <button
            type="submit"
            onClick={onLoadImportNewClick}
            className={`btn btn-primary ml-auto ${
              newImportBody ? null : `disabled`
            }`}
          >
            Загрузить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Import;
