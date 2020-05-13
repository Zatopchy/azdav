import * as axios from "axios";

const instanceHeader = axios.create({
  baseURL: "/headerAPI/",
});

export const getExportFile = () => {
  return instanceHeader.get(`getExportFile`).then((res) => {
    console.log(res);
  });
};
