import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

const TextEditor = () => {
  const [value, setValue] = useState("");
  const editorStyle = {
    height: '7rem', 
  };
  return (
    <div className="text-editor">
      <EditorToolbar/>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={editorStyle}
      />
    </div>
  );
};

export default TextEditor;
