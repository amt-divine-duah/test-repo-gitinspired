import * as fs from "fs-extra";
import { API, FILENAME } from "../constants/constants";
import * as hidefile from "hidefile";
import axios from "axios";

export const configDirectory = async (response) => {
  //validate first
  const res = await axios.post(API.CONFIG, response);
  const file = FILENAME.CONFIG;

  if (res.data.success) {
    try {
      fs.writeFileSync(file, JSON.stringify(response));
      hidefile.hideSync(file);
      console.log(`Folder configured successully on ${response.uniqueCode}`);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Invalid unique code or id. Please confirm");
  }
};
