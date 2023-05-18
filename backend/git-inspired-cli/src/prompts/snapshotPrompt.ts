export const snapshotQuestion = {
  type: "input",
  name: "name",
  message: "Enter the name of the snapshot",
  validate: (input) => {
    if (input.trim().length === 0) {
      return "Please enter a snapshot name";
    }
    return true;
  },
};