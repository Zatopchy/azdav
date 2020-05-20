import * as axios from "axios";

const instanceHeader = axios.create({
  baseURL: "/headerAPI/",
});

export const getExportFile = () => {
  return instanceHeader.get(`getExportFile`).then((res) => {
    let a = document.createElement("a");
    a.href = `http://localhost:5000/headerAPI/getExportFile`;
    a.click();
  });
};
