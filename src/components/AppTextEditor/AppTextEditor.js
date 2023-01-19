import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AppTextEditor.scss";

const AppTextEditor = () => (
  <Editor
    wrapperClassName="wrapper-class"
    editorClassName="editor-class"
    toolbarClassName="toolbar-class"
  />
);

// import React from "react";

// const AppTextEditor = () => {
//   return <div>AppTextEditor</div>;
// };

export default AppTextEditor;
