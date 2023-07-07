<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
=======
import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
>>>>>>> a913455 (product tab draggable)
import { convertToHTML, convertFromHTML } from "draft-convert";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AppTextEditor.scss";
const AppTextEditor = ({ value, setFieldValue }) => {
<<<<<<< HEAD
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

  // if (!editorState) {
  //   return <div>Loading editor...</div>;
  // }
=======
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setFieldValue(html);
  }, [editorState, setFieldValue]);
  useEffect(() => {
    console.log({ value, isFirstRender });
    if (isFirstRender && value) {
      const editState = EditorState.createWithContent(convertFromHTML(value));
      setEditorState(editState);
      setIsFirstRender(false);
    }
  }, [value, isFirstRender]);
>>>>>>> a913455 (product tab draggable)
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
<<<<<<< HEAD
      onEditorStateChange={handleEditorStateChange}
=======
      onEditorStateChange={setEditorState}
>>>>>>> a913455 (product tab draggable)
    />
  );
};
export default AppTextEditor;