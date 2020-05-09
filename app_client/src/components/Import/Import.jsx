import React from "react";

const Import = (props) => {
  let state = props.importPage;

  let newImportBody = state.newImportBody;

  let onUpdateNewImportChangeBody = (e) => {
    let newImportChangeBody = e.target.files[0].name;
    props.updateNewImportChange(newImportChangeBody);
  };

  let onLoadImportNewClick = () => {
    props.loadImportNew();
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
            class="form-group was-validated"
          >
            <input
              type="file"
              className="custom-file-input"
              id="validatedCustomFile"
              onChange={onUpdateNewImportChangeBody}
              required
            />

            <label className="custom-file-label" data-browse="Выбрать"></label>
            <div class="invalid-feedback">Файл не выбран</div>
            <div class="valid-feedback">{newImportBody}</div>
          </form>
        </div>
        <div className="col-md-5 p-0 ml-4">
          <button
            type="submit"
            onClick={onLoadImportNewClick}
            class="btn btn-primary ml-auto"
          >
            Загрузить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Import;
