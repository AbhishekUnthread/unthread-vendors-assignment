import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./AppTextEditor.css";

const AppTextEditor = ({ value, setFieldValue = (_) => {} }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(_, editor) => {
        const data = editor.getData();
        setFieldValue(data);
      }}
    />
  );
};

export default AppTextEditor;
