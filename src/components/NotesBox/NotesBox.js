import React from "react";
import { TextareaAutosize } from "@mui/material";

const NotesBox = ({ name, value, onChange }) => {
  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-lightBlue fw-500">Notes</h6>
      </div>
      <TextareaAutosize
        name={name}
        value={value}
        onChange={onChange}
        aria-label="meta description"
        placeholder="Type Something"
        style={{
          background: "#15142A",
          color: "#c8d8ff",
          borderRadius: 5,
          paddingInline: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        minRows={3}
        className="col-12"
      />
      <small className="mt-1 text-grey-6 font1">Note: Customer can't see this, its for your reference</small>
    </div>
  );
};

export default NotesBox;
