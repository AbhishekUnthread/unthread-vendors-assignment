// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { Button, Tooltip } from "@mui/material";
import ImageIconView from "../AllFiles/ImageIconView";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useBulkDeleteFilesMutation, useDeleteFileMutation, useEditFileMutation } from "../../../../features/settings/filemanager/filemanagerApiSlice";
import TableMassActionButton from "../../../../components/TableMassActionButton/TableMassActionButton";
import { useGetFilesQuery } from "../../../../features/settings/filemanager/filemanagerApiSlice";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
import FolderNameDialog from "../FolderNameDialog";
import VideoIconView from "../AllFiles/VideoIconView";

const ImagesOnly = ({ fileType = "" }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const clearSelected = () => setSelected([]);

  const { data: allFilesData } = useGetFilesQuery({ fileType });
  const allFiles = allFilesData?.data?.data ?? [];

  const [editFile] = useEditFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [bulkDeleteFiles] = useBulkDeleteFilesMutation();

  const [renamingFile, setRenamingFile] = useState(null);
  const [deletingFile, setDeletingFile] = useState(null);

  return (
    <div className="my-3">
      <div className="row mb-3">
        <div className="col d-flex align-items-center">
          <h4 className="text-lightBlue text-capitalize fs-6 fw-500 me-2">All / {fileType}s</h4>
          <Tooltip
            title="Lorem ipsum"
            placement="top">
            <img
              src={info}
              alt="info"
              className="c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        {selected.length > 0 && (
          <div className="col-auto">
            <div className="d-flex align-items-center px-2 mb-3">
              <button className="button-grey py-2 px-3">
                <small className="text-lightBlue">
                  {selected.length} {fileType} are selected{" "}
                  <span
                    className="text-blue-2 c-pointer"
                    onClick={clearSelected}>
                    (Clear Selection)
                  </span>
                </small>
              </button>
              <TableMassActionButton
                headingName="Mass Action"
                defaultValue={["Move To Folder", "Delete"]}
                onSelect={(action) => {
                  console.log("bulk-action", action);
                  switch (action) {
                    case "Delete":
                      setDeletingFile({});
                      break;

                    default:
                      break;
                  }
                }}
              />
            </div>
          </div>
        )}
        {/* <div className="col-auto">
          <Button
            variant="text"
            className="me-2">
            <span className="text-blue-2">+ Some Action</span>
          </Button>
        </div> */}
      </div>
      <div className="row align-items-center">
        {allFiles.map((file) => (
          <div
            key={file._id}
            className="col-2 my-2">
            {fileType === "image" && (
              <ImageIconView
                file={file}
                isSelected={selected.includes(file)}
                onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                onRename={(file) => setRenamingFile(file)}
                onDelete={(file) => setDeletingFile(file)}
              />
            )}
            {fileType === "video" && (
              <VideoIconView
                file={file}
                isSelected={selected.includes(file)}
                onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                onRename={(file) => setRenamingFile(file)}
                onDelete={(file) => setDeletingFile(file)}
              />
            )}
          </div>
        ))}
      </div>

      <FolderNameDialog
        isOpen={!!renamingFile}
        buttonText="Rename"
        headingText="Rename File"
        folderName={renamingFile?.name ?? ""}
        onClose={() => setRenamingFile(null)}
        onAction={(name = "") => {
          editFile({ id: renamingFile._id, fileData: { name } })
            .unwrap()
            .then(() => dispatch(showSuccess({ message: "File renamed successfully" })))
            .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
            .finally(() => setRenamingFile(null));
        }}
      />

      <DeleteAlertDialog
        show={!!deletingFile}
        title="Delete File"
        primaryMessage={`Do you want to delete ${selected.length > 0 ? `${selected.length} files` : deletingFile?.name ?? ""} permanently?`}
        confirmText="Delete"
        onCancel={() => setDeletingFile(null)}
        onConfirm={() => {
          if (selected.length > 0) {
            bulkDeleteFiles({ deletes: selected.map((sl) => sl._id) })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: `${selected.length} Files Deleted successfully!` })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
              .finally(() => {
                clearSelected();
                setDeletingFile(null);
              });
          } else {
            deleteFile(deletingFile._id)
              .unwrap()
              .then(() => dispatch(showSuccess({ message: "Folder deleted successfully" })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
              .finally(() => {
                clearSelected();
                setDeletingFile(null);
              });
          }
        }}
      />
    </div>
  );
};

export default ImagesOnly;
