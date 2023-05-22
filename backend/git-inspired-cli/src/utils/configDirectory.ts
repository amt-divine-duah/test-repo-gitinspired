import * as fs from 'fs-extra';
import { API, FILENAME } from '../constants/constants';
import * as hidefile from 'hidefile';
import path = require('path');

export const configDirectory = async (response) => {
  const file = path.resolve(process.cwd(),FILENAME.CONFIG);
  try {
    if(!fs.existsSync(file)){
      fs.writeFileSync(file, JSON.stringify(response));
    } else{
      fs.unlinkSync(file);
      fs.writeFileSync(file, JSON.stringify(response));
    }
    fs.chmodSync(file, 0o666);
    hidefile.hideSync(file);
    console.log(`Folder configured successully on ${response.uniqueCode}`);
  } catch (e) {
    console.log(e);
  }
};
