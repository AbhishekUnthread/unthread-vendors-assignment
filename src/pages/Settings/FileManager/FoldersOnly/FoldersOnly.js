import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, TableBody, TableContainer, Tooltip } from "@mui/material";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
import {
  useBulkDeleteFoldersMutation,
  useDeleteFolderMutation,
  useEditFolderMutation,
  useGetFoldersQuery,
} from "../../../../features/settings/filemanager/filemanagerApiSlice";
import info from "../../../../assets/icons/info.svg";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import NameRenameDialog from "../Dialogs/NameRenameDialog";
import DeleteAlertDialog from "../Dialogs/DeleteAlertDialog";
import OnlyFoldersIconView from "../FileManagerViews/OnlyFoldersIconView";
import TableMassActionButton from "../../../../components/TableMassActionButton/TableMassActionButton";
import { EnhancedTableHead } from "../../../../components/TableDependencies/TableDependencies";
import FolderListView from "../FileManagerViews/FolderListView";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "size",
    numeric: false,
    disablePadding: false,
    label: "Size",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

export default function FoldersOnly({ views = "icon", queryFilters = {}, onExplore = () => {} }) {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const clearSelected = () => setSelected([]);

  const handleFolderSelection = (check, folder) => setSelected(check ? selected.concat(folder) : selected.filter((sl) => !Object.is(sl, folder)));

  const { data: allFoldersData } = useGetFoldersQuery(queryFilters);
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
    if (selected.length > 0) {
      bulkDeleteFolders({ deletes: selected.map((sl) => sl._id) })
        .unwrap()
        .then(() => dispatch(showSuccess({ message: `${selected.length} Folders Deleted successfully!` })))
        .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
        .finally(() => {
          clearSelected();
          setDeletingFolder(null);
        });
    } else {
      deleteFolder(deletingFolder._id)
        .unwrap()
        .then(() => {
          dispatch(showSuccess({ message: "Folder Deleted successfully" }));
        })
        .catch((e) => {
          console.log(e);
          dispatch(showError({ message: e.message ?? "Something went wrong" }));
        })
        .finally(() => {
          clearSelected();
          setDeletingFolder(null);
        });
    }
  };

  const [bulkDeleteFolders] = useBulkDeleteFoldersMutation();

  const handleBulkActionSelect = (action) => {
    if (action === "Delete") {
      handleDeleteFolderSelect({});
    }
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
        {selected.length > 0 && (
          <div className="d-flex align-items-center px-2 mb-3">
            <button className="button-grey py-2 px-3">
              <small className="text-lightBlue">
                {selected.length} folders are selected{" "}
                <span
                  className="text-blue-2 c-pointer"
                  onClick={clearSelected}>
                  (Clear Selection)
                </span>
              </small>
            </button>
            <TableMassActionButton
              headingName="Mass Action"
              onSelect={handleBulkActionSelect}
              defaultValue={["Delete"]}
            />
          </div>
        )}
      </div>
      {views === "icon" && (
        <div className="row align-items-center">
          {allFolders.map((folder) => (
            <div
              key={folder._id}
              className="col-2 my-2">
              <OnlyFoldersIconView
                folder={folder}
                isSelected={selected.includes(folder)}
                onDoubleClick={onExplore}
                onSelect={handleFolderSelection}
                onRename={handleRenameFolderSelect}
                onDelete={handleDeleteFolderSelect}
              />
            </div>
          ))}
        </div>
      )}

      {views === "list" && (
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={(e) => setSelected(e.target.checked ? [...allFolders] : [])}
              rowCount={allFolders.length}
              headCells={headCells}
            />
            <TableBody>
              {allFolders.map((folder) => (
                <FolderListView
                  key={folder._id}
                  folder={folder}
                  isSelected={selected.includes(folder)}
                  onDoubleClick={onExplore}
                  onSelect={(check, folder) => setSelected(check ? selected.concat(folder) : selected.filter((sl) => !Object.is(sl, folder)))}
                  onRename={(folder) => setRenamingFolder(folder)}
                  onDelete={(folder) => setDeletingFolder(folder)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <NameRenameDialog
        isOpen={!!renamingFolder}
        headingText="Rename Folder"
        labelText="Folder Name"
        folderName={renamingFolder?.name ?? ""}
        buttonText="Rename"
        imageSrc={folderLargePurple}
        onClose={handleRenameFolderClose}
        onAction={handleRenameFolder}
      />

      <DeleteAlertDialog
        show={!!deletingFolder}
        title="Delete Folder"
        primaryMessage={`Do you want to delete ${selected.length > 0 ? `${selected.length} folders` : deletingFolder?.name ?? ""} permanently?`}
        secondaryMessage={`This will also delete ${
          selected.length > 0 ? `${selected.reduce((t, sl) => t + sl.fileCount, 0)}` : deletingFolder?.count ?? ""
        } files in it!`}
        confirmText="Delete"
        onConfirm={handleDeleteFolder}
        onCancel={handleDeleteFolderClose}
      />
    </div>
  );
}
