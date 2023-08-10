import { Tooltip } from "@mui/material";
import OnlyFoldersIconView from "./OnlyFoldersIconView";
import info from "../../../../assets/icons/info.svg";
import { useDeleteFolderMutation, useEditFolderMutation, useGetFoldersQuery } from "../../../../features/settings/filemanager/filemanagerApiSlice";
import FolderNameDialog from "../FolderNameDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
import DeleteAlertDialog from "../DeleteAlertDialog";

export default function FoldersOnly() {
  const dispatch = useDispatch();

  const { data: allFoldersData } = useGetFoldersQuery(/* { search: "", sort: "" } */);
  const allFolders = allFoldersData?.data?.data ?? [];

  const [renameEditFolder] = useEditFolderMutation();
  const [renamingFolder, setRenamingFolder] = useState(null);
  const handleRenameFolderSelect = (folder) => setRenamingFolder(folder);
  const handleRenameFolderClose = () => setRenamingFolder(null);
  const handleRenameFolder = (name = "") => {
    renameEditFolder({ id: renamingFolder._id, folderData: { name } })
      .unwrap()
      .then(() => {
        handleRenameFolderClose();
        dispatch(showSuccess({ message: "Folder renamed successfully" }));
      })
      .catch((e) => {
        console.log(e);
        dispatch(showError({ message: "Something went wrong" }));
      });
  };

  const [deleteFolder] = useDeleteFolderMutation();
  const [deletingFolder, setDeletingFolder] = useState(null);
  const handleDeleteFolderSelect = (folder) => setDeletingFolder(folder);
  const handleDeleteFolderClose = () => setDeletingFolder(null);
  const handleDeleteFolder = () => {
    deleteFolder(deletingFolder._id)
      .unwrap()
      .then(() => {
        handleDeleteFolderClose();
        dispatch(showSuccess({ message: "Folder deleted successfully" }));
      })
      .catch((e) => {
        console.log(e);
        dispatch(showError({ message: "Something went wrong" }));
      });
  };

  return (
    <div className="my-3">
      <div className="row mb-3">
        <div className="col d-flex align-items-center">
          <h4 className="text-lightBlue fs-6 fw-500 me-2">All / Folders</h4>
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
        {/* Multi Select stuff will be here */}
        {/* <div className="col-auto">
          <Button
            variant="text"
            className="me-2">
            <span
              className="text-blue-2"
              onClick={addFolderClick}>
              + Create a new folder
            </span>
          </Button>
        </div> */}
      </div>
      <div className="row align-items-center">
        {allFolders.map((folder) => (
          <div
            key={folder._id}
            className="col-2 my-2">
            <OnlyFoldersIconView
              folder={folder}
              onRename={handleRenameFolderSelect}
              onDelete={handleDeleteFolderSelect}
            />
          </div>
        ))}
      </div>

      <FolderNameDialog
        isOpen={!!renamingFolder}
        buttonText="Rename"
        headingText="Rename Folder"
        folderName={renamingFolder?.name ?? ""}
        onClose={handleRenameFolderClose}
        onAction={handleRenameFolder}
      />

      <DeleteAlertDialog
        show={!!deletingFolder}
        title="Delete Folder"
        primaryMessage={`Do you want to delete ${deletingFolder?.name ?? ""} permanently?`}
        secondaryMessage={`This will also delete ${deletingFolder?.count ?? ""} files in it!`}
        confirmText="Delete"
        onConfirm={handleDeleteFolder}
        onCancel={handleDeleteFolderClose}
      />
    </div>
  );
}
