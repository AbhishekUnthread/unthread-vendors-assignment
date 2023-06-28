import React,{useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./AppTextEditor.scss";

const AppTextEditor = ({ value, setFieldValue }) => {

  const prepareDraft = (value) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(forFormik, "text/html");
    const plainText = parsedHtml.body.textContent || ""; // Extract plain text from parsed HTML

    setFieldValue(plainText);
    setEditorState(editorState);
  };

    return(
      <Editor
      editorState={editorState}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      onEditorStateChange={onEditorStateChange}
    />
    )
}
 


export default AppTextEditor;
