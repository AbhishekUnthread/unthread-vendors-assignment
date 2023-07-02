import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AppTextEditor.scss";

const AppTextEditor = ({ value="<p><p/>", setFieldValue }) => {
  const [editorState, setEditorState] = useState(null);
  useEffect(() => {
    if (value && !editorState) {
      const contentState = convertFromHTML(value);
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState);
    }
  }, [value, editorState]);
  useEffect(() => {
    if (editorState) {
      const html = convertToHTML(editorState.getCurrentContent());
      setFieldValue(html);
    }
  }, [editorState, setFieldValue]);
  const handleEditorStateChange = (state) => {
    setEditorState(state);
  };

  if (!editorState) {
    return <div>Loading editor...</div>;
  }
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      onEditorStateChange={handleEditorStateChange}
    />
  );
};

export default AppTextEditor;

