import path from "path";
import util from "util";
import fs from "fs";
import logger from "../configs/winstonConfig";
import _ from "lodash";
import * as fastcsv from "fast-csv";

const readdir = util.promisify(fs.readdir);

// const currentDir = path.resolve(`src/uploads/students`)

// Get file names present in the directory
export const getCsvFiles = async (currentDir: string) => {
  try {
    const filenames = await readdir(currentDir);
    const filteredFiles = _.filter(filenames, (filename) => {
      return _.endsWith(filename, ".csv");
    });
    return filteredFiles;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

export async function csvToDb(currentDir: string) {
  const filenames = await getCsvFiles(currentDir);
  for (let i = 0; i < filenames.length; i++) {
    let curretFilePath = path.join(currentDir, filenames[i])

    const uploadedFileStream = fs.createReadStream(curretFilePath);
    let csvCollection = [];
    // parse the data
    uploadedFileStream
      .pipe(fastcsv.parse())
      .validate((data) => {
        return console.log("All of them");
      })
      .on("data-invalid", (row, rowNumber) => console.log("Invalid Row", row, rowNumber))
      .on("error", (error) => logger.error("%j", error))
      .on("data", (row) => {
        csvCollection.push(row);
      })
      .on("end", (rowCount: number) => {
        logger.info(`Number of rows parsed is ${rowCount}`);
        console.log(csvCollection);
      });
  }
}
