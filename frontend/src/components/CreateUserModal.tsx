import React from "react";
import api from "../ApiClient";
import "../Styles/createUserModal.scss";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../constants/messages";
import { UserInterface } from "../interfaces/UserInterface";

type Prop = {
  user: string;
  showModal: React.MouseEventHandler;
  onCreateUser: (newUser: UserInterface) => void;
};

interface FormErrors {
  email?: string[];
  firstname?: string[];
  lastname?: string[];
}

const CreateUserModal = ({ showModal, user, onCreateUser }: Prop) => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const firstnameRef = React.useRef<HTMLInputElement>(null);
  const lastnameRef = React.useRef<HTMLInputElement>(null);

  const [formErrors, setFormErrors] = React.useState<FormErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current ? emailRef.current.value : "";
    const lastname = lastnameRef.current ? lastnameRef.current.value : "";
    const firstname = firstnameRef.current ? firstnameRef.current.value : "";
    const formData = { email: email, firstname: firstname, lastname: lastname };
    try {
      const response = await api.post(`/api/admin/create-${user}`, formData);
      if (response.status === StatusCodes.OK) {
        if (user==="student") {
          const student: UserInterface = {
            studentId: response.data?.data["studentId"],
            name: `${response.data?.data["firstName"]} ${response.data?.data["lastName"]}`,
            email: response.data?.data["email"],
          };
          setFormErrors({});
          showSuccessMessage(response.data?.message);
          onCreateUser(student);
        }
        else if (user==="lecturer") {
          console.log("This is response", response)
          const lecturer: UserInterface = {
            staffId: response.data?.data["staffId"],
            name: `${response.data?.data["firstName"]} ${response.data?.data["lastName"]}`,
            email: response.data?.data["email"],
          };
          setFormErrors({});
          showSuccessMessage(response.data?.message);
          console.log(lecturer, "I have lecturer")
          onCreateUser(lecturer);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          setFormErrors(error.response?.data["error"]);
          return;
        } else {
          setFormErrors({});
          showErrorMessage("Something went wrong");
          return;
        }
      }
    }
  }

  // If validation error

  if (formErrors["email"]?.[0]) {
    showErrorMessage(formErrors["email"]?.[0]);
  } else if (formErrors["firstname"]?.[0]) {
    showErrorMessage(formErrors["firstname"]?.[0]);
  } else if (formErrors["lastname"]?.[0]) {
    showErrorMessage(formErrors["lastname"]?.[0]);
  }

  return (
    <div className="container" onClick={showModal}>
      <div
        className="createUserModal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>Tell us a little about the {_.capitalize(user)} you are adding</h2>
        <p>Please fill the following details to get started </p>

        <form className="create-user-form" onSubmit={handleSubmit}>
          <div className="modal-input">
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              required
              ref={emailRef}
            />
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              id="firstname"
              required
              ref={firstnameRef}
            />
            <input
              type="text"
              placeholder="lastname"
              name="lastname"
              id="lastname"
              required
              ref={lastnameRef}
            />
          </div>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
