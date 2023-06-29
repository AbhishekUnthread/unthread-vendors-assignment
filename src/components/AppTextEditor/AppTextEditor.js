import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AppTextEditor.scss";
const AppTextEditor = ({ value, setFieldValue }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setFieldValue(html);
  }, [editorState, setFieldValue]);
  useEffect(() => {

    if (isFirstRender && value) {
      const editState = EditorState.createWithContent(convertFromHTML(value));
      setEditorState(editState);
      setIsFirstRender(false);
    }
  }, [value, isFirstRender]);
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      onEditorStateChange={setEditorState}
    />
  );
};
export default AppTextEditor;
