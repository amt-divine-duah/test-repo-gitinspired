import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

export class FileUploader {
  static upload(
    fileFieldName: string,
    folderName: string,
    fileSize: number,
    fileTypes: string[] = [
      "text/csv",
    ]
  ) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadsFolder = path.resolve("src/uploads");
        const folder = path.resolve(`src/uploads/${folderName}`);
        if (!fs.existsSync(uploadsFolder)) {
          fs.mkdirSync(uploadsFolder);
        }
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        }
        cb(null, folder);
      },
      filename: (req, file, callBack) => {
        callBack(
          null,
          crypto.randomBytes(12).toString("hex") +
            "-" +
            path.parse(file.originalname).name +
            path.extname(file.originalname)
        );
      },
    });
    const fileFilter = (req, file, cb) => {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"), false);
      }
    };
    let upload = multer({
      storage: storage,
      limits: { fileSize: fileSize },
      fileFilter,
    }).array(fileFieldName);

    return upload;
  }
}
