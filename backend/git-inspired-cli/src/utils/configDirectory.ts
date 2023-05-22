import * as fs from 'fs-extra';
import { API, FILENAME } from '../constants/constants';
import * as hidefile from 'hidefile';

export const configDirectory = async (response) => {
  const file = FILENAME.CONFIG;
  try {
    fs.writeFileSync(file, JSON.stringify(response));
    fs.chmodSync(file, 0o644);
    hidefile.hideSync(file);
    console.log(`Folder configured successully on ${response.uniqueCode}`);
  } catch (e) {
    console.log(e);
  }
};
