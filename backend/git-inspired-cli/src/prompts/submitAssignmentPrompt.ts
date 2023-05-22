export const submitAssignmentPrompt = {
  type: "input",
  name: "password",
  message: "Please enter your password",
  validate: (input) => {
    if (input.trim().length === 0) {
      return "Please enter your password";
    }
    return true;
  },
};
