import React from "react";
import "../Styles/uploadModal.scss";
import api from "../ApiClient";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { showErrorMessage, showSuccessMessage } from "../constants/messages";
import { UserInterface } from "../interfaces/UserInterface";
import _ from "lodash";

type Prop = {
  showUploadModal: React.MouseEventHandler;
  user: string;
  onBulkUpload: any;
  hideModal: any;
};
const UploadModal = ({
  showUploadModal,
  onBulkUpload,
  user,
  hideModal,
}: Prop) => {
  const fileFieldRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  async function handleSubmit() {
    const imageFiles = fileFieldRef.current?.files || "";
    const formData = new FormData();
    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("files", imageFiles[i]);
      }
    }
    try {
      const response = await api.post(
        `/api/admin/upload-${user}-info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === StatusCodes.OK) {
        if (user === "lecturer") {
          const keysToPick = ["staffId", "firstName", "lastName", "email"];
          const results = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick)
          ) as UserInterface[];
          showSuccessMessage(response.data?.message);
          onBulkUpload(results);
        }
        else if (user === "student") {
          const keysToPick = ["studentId", "firstName", "lastName", "email"];
          const results = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick)
          ) as UserInterface[];
          showSuccessMessage(response.data?.message);
          onBulkUpload(results);
        }
      } else {
        showErrorMessage("Something went wrong");
        hideModal();
      }
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          if (
            typeof error.response?.data["error"] === "object" &&
            Object.keys(error.response?.data["error"]).length > 0
          ) {
            const firstKey = Object.keys(error.response?.data["error"])[0];
            const message = error.response?.data["error"][firstKey];
            showErrorMessage(message[0]);
            hideModal();
          } else {
            showErrorMessage(error.response?.data["message"]);
            hideModal();
          }
          return;
        }
      } else {
        showErrorMessage("Something went wrong");
        hideModal();
        return;
      }
    }
  }
  return (
    <form
      className="uploadModalContainer"
      onClick={showUploadModal}
      encType="multipart/form-data"
      ref={formRef}
    >
      <div className="uploadModal" onClick={(e) => e.stopPropagation()}>
        <h2>Upload a file</h2>
        <p>Please upload a file to get started</p>
        <div className="modalFileUpload">
          <img src="./Black and White Collection.png" alt="" />
          <label htmlFor="files" className="uploadbtn">
            Upload a file
          </label>
          <input
            id="files"
            type="file"
            onChange={handleSubmit}
            ref={fileFieldRef}
            multiple
          />
          <p>or drop a file</p>
          <h3>Only CSV file accepted</h3>
          <p>
            It must have a required columns of emails. firstname and lastname
          </p>
        </div>
      </div>
    </form>
  );
};

export default UploadModal;
