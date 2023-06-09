
import { Quill } from "react-quill";
import '../Styles/EditotToolbar.scss';


const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);


const Font = Quill.import("formats/font");
Font.whitelist = [
  "roboto",
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);


export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
    
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};


export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "attachment",
  "code-block"
];


export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
    <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>  
    </span>
  
    <span className="ql-formats">
          <button className="ql-align" value=""></button>
          <button className="ql-align" value="center"> </button>
          <button className="ql-align" value="right"></button>
          <button className="ql-align" value="justify"></button>
    </span>

    <select className="ql-size" defaultValue="medium">
        <option value="small">small</option>
        <option value="regular">Normal</option>
        <option value="large">large</option>
      </select>

      
    <span className="ql-formats">
      <button className="ql-attachment"/>
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>

    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>

    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>

    <span className="ql-formats">
      <button className="ql-formula" />

    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>

    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>

   
  </div>
);

export default QuillToolbar;