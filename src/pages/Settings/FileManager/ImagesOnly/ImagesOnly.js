import info from "../../../../assets/icons/info.svg";
import { Button, Tooltip } from "@mui/material";
import ImageIconView from "../AllFiles/ImageIconView";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  useBulkDeleteFilesMutation,
  useBulkEditFileMutation,
  useDeleteFileMutation,
  useEditFileMutation,
} from "../../../../features/settings/filemanager/filemanagerApiSlice";
import TableMassActionButton from "../../../../components/TableMassActionButton/TableMassActionButton";
import { useGetFilesQuery } from "../../../../features/settings/filemanager/filemanagerApiSlice";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
import FolderNameDialog from "../FolderNameDialog";
import VideoIconView from "../AllFiles/VideoIconView";
import FolderMoveInDialog from "../FolderMoveInDialog";

const ImagesOnly = ({ refetchFiles = false, fileType = "" }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const clearSelected = () => setSelected([]);

  const { data: allFilesData, refetch: refetchAllFilesData } = useGetFilesQuery({ fileType });
  const allFiles = allFilesData?.data?.data ?? [];

  useEffect(() => {
    if (refetchFiles) refetchAllFilesData();
  }, [refetchFiles, refetchAllFilesData]);

  const [editFile] = useEditFileMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [bulkEditFiles] = useBulkEditFileMutation();
  const [bulkDeleteFiles] = useBulkDeleteFilesMutation();

  const [movingFile, setMovingFile] = useState(null);
  const [renamingFile, setRenamingFile] = useState(null);
  const [deletingFile, setDeletingFile] = useState(null);

  const handleCopyLink = (file) => {
    try {
      navigator.clipboard.writeText(file.file);
      dispatch(showSuccess({ message: "File link copied" }));
    } catch (error) {
      dispatch(showError({ message: error.message ?? "Something went wrong" }));
    }
  };

  const handleDownloadFile = (file) => {
    try {
      const link = document.createElement("a");
      link.download = file.name;
      link.href = file.file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      dispatch(showError({ message: error.message ?? "Something went wrong" }));
    }
  };

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
                  case "Move To Folder":
                    setMovingFile({});
                    break;

                  default:
                    break;
                }
              }}
            />
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
                onCopyLink={handleCopyLink}
                onMoveToFolder={(file) => setMovingFile(file)}
                onRename={(file) => setRenamingFile(file)}
                onDownload={handleDownloadFile}
                onDelete={(file) => setDeletingFile(file)}
              />
            )}
            {fileType === "video" && (
              <VideoIconView
                file={file}
                isSelected={selected.includes(file)}
                onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                onCopyLink={handleCopyLink}
                onMoveToFolder={(file) => setMovingFile(file)}
                onRename={(file) => setRenamingFile(file)}
                onDownload={handleDownloadFile}
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

      <FolderMoveInDialog
        isOpen={!!movingFile}
        buttonText="Move"
        headingText={`Move ${selected.length > 0 ? `${selected.length} Files` : ""} To a Folder`}
        fileImage={movingFile?.file ?? ""}
        onClose={() => setMovingFile(null)}
        onAction={(folderId = "") => {
          if (selected.length > 0) {
            bulkEditFiles({ updates: selected.map((sl) => ({ id: sl._id, folderId })) })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: `${selected.length} Files Deleted successfully!` })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
              .finally(() => {
                clearSelected();
                setMovingFile(null);
              });
          } else {
            editFile({ id: movingFile._id, fileData: { folderId } })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: "File moved successfully" })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
              .finally(() => {
                clearSelected();
                setMovingFile(null);
              });
          }
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
              .then(() => dispatch(showSuccess({ message: "File deleted successfully" })))
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
