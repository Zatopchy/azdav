import * as axios from "axios";

const instanceImport = axios.create({
  baseURL: "/importAPI/",
});

export const uploadImportFile = (_ImportResponse, _importBody) => {
  var formData = new FormData();
  formData.append("importFile", _importBody);

  return instanceImport.post(`uploadImportFile`, formData).then((res) => {
    debugger;
    _ImportResponse(res.data.importResponse);
  });
};
