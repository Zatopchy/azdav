import * as axios from "axios";

const instanceImport = axios.create({
  baseURL: "/importAPI/",
});

export const uploadImportFile = (_importResponse, _importBody) => {
  var formData = new FormData();
  formData.append("importFile", _importBody);

  return instanceImport.post(`uploadImportFile`, formData).then((res) => {
    _importResponse(res.data.importResponse);
  });
};
