import "./AllFiles.scss";
import info from "../../../../assets/icons/info.svg";
import video from "../../../../assets/images/dashboard/video.png";
import folderLargePurple from "../../../../assets/icons/folderLargePurple.svg";
import { Table, TableBody, TableContainer, Tooltip } from "@mui/material";
import ImageIconView from "../FileManagerViews/ImageIconView";
import VideoIconView from "../FileManagerViews/VideoIconView";
import FolderIconView from "../FileManagerViews/FolderIconView";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  useBulkDeleteFilesMutation,
  useBulkDeleteFoldersMutation,
  useBulkEditFileMutation,
  useDeleteFileMutation,
  useDeleteFolderMutation,
  useEditFileMutation,
  useEditFolderMutation,
  useGetFilesQuery,
  useGetFoldersQuery,
} from "../../../../features/settings/filemanager/filemanagerApiSlice";
import TableMassActionButton from "../../../../components/TableMassActionButton/TableMassActionButton";
import NameRenameDialog from "../Dialogs/NameRenameDialog";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
import DeleteAlertDialog from "../Dialogs/DeleteAlertDialog";
import MoveInFolderDialog from "../Dialogs/MoveInFolderDialog";
import { EnhancedTableHead } from "../../../../components/TableDependencies/TableDependencies";
import FolderListView from "../FileManagerViews/FolderListView";
import ImageListView from "../FileManagerViews/ImageListView";
import VideoListView from "../FileManagerViews/VideoListView";

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

export default function AllFiles({ views = "icon", queryFilters = {}, onPopup = () => {}, refetchFiles = false, onExplore = () => {}, changeTab = () => {} }) {
  // const seeAllFolders = () => changeTab(null, 1);
  // const seeAllImages = () => changeTab(null, 2);
  // const seeAllVideos = () => changeTab(null, 3);

  const dispatch = useDispatch();

  const [folderSelected, setFolderSelected] = useState([]);
  const clearfolderSelected = () => setFolderSelected([]);

  const { data: allFoldersData } = useGetFoldersQuery({ ...queryFilters, rowsPerPage: 8, page: 0 });
  const allFolders = allFoldersData?.data?.data ?? [];

  const [editFolder] = useEditFolderMutation();
  const [deleteFolder] = useDeleteFolderMutation();
  const [bulkDeleteFolders] = useBulkDeleteFoldersMutation();

  const [renamingFolder, setRenamingFolder] = useState(null);
  const [deletingFolder, setDeletingFolder] = useState(null);

  // Files Stuff

  const [fileSelected, setFileSelected] = useState([]);
  const clearfileSelected = () => setFileSelected([]);

  const { data: allFilesData, refetch: refetchAllFilesData } = useGetFilesQuery({ ...queryFilters, rowsPerPage: 8, page: 0 });
  const allFiles = allFilesData?.data?.data ?? [];

  // const { data: allImagesData, refetch: refetchAllImagesData } = useGetFilesQuery({ ...queryFilters, fileType: "image", rowsPerPage: 8, page: 0 });
  // const allImages = allImagesData?.data?.data ?? [];

  // const { data: allVideosData, refetch: refetchAllVideosData } = useGetFilesQuery({ ...queryFilters, fileType: "video", rowsPerPage: 8, page: 0 });
  // const allVideos = allVideosData?.data?.data ?? [];

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

  useEffect(() => {
    if (refetchFiles) refetchAllFilesData();
  }, [refetchFiles, refetchAllFilesData]);

  return (
    <>
      <div className="my-3">
        <div className="row mb-3">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fs-6 fw-500 me-2">Folders</h4>
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
          {/* <div className="col-auto">
            <Button
              variant="text"
              className="me-2"
              onClick={seeAllFolders}>
              <span className="text-lightBlue">See All</span>
            </Button>
          </div> */}
        </div>
        {folderSelected.length > 0 && (
          <div className="d-flex align-items-center px-2 mb-3">
            <button className="button-grey py-2 px-3">
              <small className="text-lightBlue">
                {folderSelected.length} folders are selected{" "}
                <span
                  className="text-blue-2 c-pointer"
                  onClick={clearfolderSelected}>
                  (Clear Selection)
                </span>
              </small>
            </button>
            <TableMassActionButton
              headingName="Mass Action"
              defaultValue={["Delete"]}
              onSelect={(action) => {
                if (action === "Delete") {
                  setDeletingFolder({});
                }
              }}
            />
          </div>
        )}

        {views === "icon" && (
          <div className="row align-items-center">
            {allFolders.map((folder) => (
              <div
                key={folder._id}
                className="col-3">
                <FolderIconView
                  folder={folder}
                  isSelected={folderSelected.includes(folder)}
                  onDoubleClick={onExplore}
                  onSelect={(check, folder) => setFolderSelected(check ? folderSelected.concat(folder) : folderSelected.filter((sl) => !Object.is(sl, folder)))}
                  onRename={(folder) => setRenamingFolder(folder)}
                  onDelete={(folder) => setDeletingFolder(folder)}
                />
              </div>
            ))}
          </div>
        )}

        {views === "list" && (
          <TableContainer>
            <Table size="medium">
              <EnhancedTableHead
                numSelected={folderSelected.length}
                onSelectAllClick={(e) => setFolderSelected(e.target.checked ? [...allFolders] : [])}
                rowCount={allFolders.length}
                headCells={headCells}
              />
              <TableBody>
                {allFolders.map((folder) => (
                  <FolderListView
                    key={folder._id}
                    folder={folder}
                    isSelected={folderSelected.includes(folder)}
                    onDoubleClick={onExplore}
                    onSelect={(check, folder) => setFolderSelected(check ? folderSelected.concat(folder) : folderSelected.filter((sl) => !Object.is(sl, folder)))}
                    onRename={(folder) => setRenamingFolder(folder)}
                    onDelete={(folder) => setDeletingFolder(folder)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <hr className="hr-grey-6 my-3" />

      <div className="my-3">
        <div className="row mb-3">
          <div className="col d-flex align-items-center">
            <h4 className="text-lightBlue fs-6 fw-500 me-2">Files</h4>
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
          {/* <div className="col-auto">
            <Button
              variant="text"
              className="me-2"
              onClick={seeAllFolders}>
              <span className="text-lightBlue">See All</span>
            </Button>
          </div> */}
        </div>
        {fileSelected.length > 0 && (
          <div className="my-3">
            <div className="d-flex align-items-center px-2 mb-3">
              <button className="button-grey py-2 px-3">
                <small className="text-lightBlue">
                  {fileSelected.length} files are selected{" "}
                  <span
                    className="text-blue-2 c-pointer"
                    onClick={clearfileSelected}>
                    (Clear Selection)
                  </span>
                </small>
              </button>
              <TableMassActionButton
                headingName="Mass Action"
                defaultValue={["Move To Folder", "Delete"]}
                onSelect={(action) => {
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
          </div>
        )}

        {views === "icon" && (
          <div className="row align-items-center">
            {allFiles.map((file) => (
              <div
                key={file._id}
                className="col-2">
                {file.fileType === "image" && (
                  <ImageIconView
                    file={file}
                    isSelected={fileSelected.includes(file)}
                    onSelect={(check, file) => setFileSelected(check ? fileSelected.concat(file) : fileSelected.filter((sl) => !Object.is(sl, file)))}
                    onDoubleClick={onPopup}
                    onCopyLink={handleCopyLink}
                    onMoveToFolder={(file) => setMovingFile(file)}
                    onRename={(file) => setRenamingFile(file)}
                    onDownload={handleDownloadFile}
                    onDelete={(file) => setDeletingFile(file)}
                  />
                )}
                {file.fileType === "video" && (
                  <VideoIconView
                    file={file}
                    isSelected={fileSelected.includes(file)}
                    onSelect={(check, file) => setFileSelected(check ? fileSelected.concat(file) : fileSelected.filter((sl) => !Object.is(sl, file)))}
                    onDoubleClick={onPopup}
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
        )}

        {views === "list" && (
          <TableContainer>
            <Table size="medium">
              <EnhancedTableHead
                numSelected={fileSelected.length}
                onSelectAllClick={(e) => setFileSelected(e.target.checked ? [...allFiles] : [])}
                rowCount={allFiles.length}
                headCells={headCells}
              />
              <TableBody>
                {allFiles.map((file) => (
                  <>
                    {file.fileType === "image" && (
                      <ImageListView
                        file={file}
                        isSelected={fileSelected.includes(file)}
                        onSelect={(check, file) => setFileSelected(check ? fileSelected.concat(file) : fileSelected.filter((sl) => !Object.is(sl, file)))}
                        onDoubleClick={onPopup}
                        onCopyLink={handleCopyLink}
                        onMoveToFolder={(file) => setMovingFile(file)}
                        onRename={(file) => setRenamingFile(file)}
                        onDownload={handleDownloadFile}
                        onDelete={(file) => setDeletingFile(file)}
                      />
                    )}
                    {file.fileType === "video" && (
                      <VideoListView
                        file={file}
                        isSelected={fileSelected.includes(file)}
                        onSelect={(check, file) => setFileSelected(check ? fileSelected.concat(file) : fileSelected.filter((sl) => !Object.is(sl, file)))}
                        onDoubleClick={onPopup}
                        onCopyLink={handleCopyLink}
                        onMoveToFolder={(file) => setMovingFile(file)}
                        onRename={(file) => setRenamingFile(file)}
                        onDownload={handleDownloadFile}
                        onDelete={(file) => setDeletingFile(file)}
                      />
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <NameRenameDialog
        isOpen={!!renamingFolder}
        headingText="Rename Folder"
        labelText="Folder Name"
        folderName={renamingFolder?.name ?? ""}
        buttonText="Rename"
        imageSrc={folderLargePurple}
        onClose={() => setRenamingFolder(null)}
        onAction={(name = "") => {
          editFolder({ id: renamingFolder._id, folderData: { name } })
            .unwrap()
            .then(() => dispatch(showSuccess({ message: "Folder renamed successfully" })))
            .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
            .finally(() => setRenamingFolder(null));
        }}
      />

      <DeleteAlertDialog
        show={!!deletingFolder}
        title="Delete Folder"
        primaryMessage={`Do you want to delete ${folderSelected.length > 0 ? `${folderSelected.length} folders` : deletingFolder?.name ?? ""} permanently?`}
        secondaryMessage={`This will also delete all files in it!`}
        confirmText="Delete"
        onCancel={() => setDeletingFolder(null)}
        onConfirm={() => {
          if (folderSelected.length > 0)
            bulkDeleteFolders({ deletes: folderSelected.map((sl) => sl._id) })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: `${folderSelected.length} Folders Deleted successfully!` })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
              .finally(() => {
                clearfolderSelected();
                setDeletingFolder(null);
              });
          else
            deleteFolder(deletingFolder._id)
              .unwrap()
              .then(() => {
                dispatch(showSuccess({ message: "Folder deleted successfully" }));
              })
              .catch((e) => {
                console.log(e);
                dispatch(showError({ message: e.message ?? "Something went wrong" }));
              })
              .finally(() => {
                clearfolderSelected();
                setDeletingFolder(null);
              });
        }}
      />

      <NameRenameDialog
        isOpen={!!renamingFile}
        headingText="Rename File"
        labelText="File Name"
        folderName={renamingFile?.name ?? ""}
        buttonText="Rename"
        imageSrc={renamingFile?.fileType === "video" ? video : renamingFile?.file ?? ""}
        onClose={() => setRenamingFile(null)}
        onAction={(name = "") => {
          editFile({ id: renamingFile._id, fileData: { name } })
            .unwrap()
            .then(() => dispatch(showSuccess({ message: "File renamed successfully" })))
            .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
            .finally(() => setRenamingFile(null));
        }}
      />

      <MoveInFolderDialog
        isOpen={!!movingFile}
        buttonText="Move"
        headingText={`Move ${fileSelected.length > 0 ? `${fileSelected.length} Files` : ""} To a Folder`}
        fileImage={movingFile?.file ?? ""}
        onClose={() => setMovingFile(null)}
        onAction={(folderId = "") => {
          if (fileSelected.length > 0)
            bulkEditFiles({ updates: fileSelected.map((sl) => ({ id: sl._id, folderId })) })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: `${fileSelected.length} Files Moved successfully!` })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
              .finally(() => {
                clearfileSelected();
                setMovingFile(null);
              });
          else
            editFile({ id: movingFile._id, fileData: { folderId } })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: "File moved successfully" })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
              .finally(() => {
                clearfileSelected();
                setMovingFile(null);
              });
        }}
      />

      <DeleteAlertDialog
        show={!!deletingFile}
        title="Delete File"
        primaryMessage={`Do you want to delete ${fileSelected.length > 0 ? `${fileSelected.length} files` : deletingFile?.name ?? ""} permanently?`}
        confirmText="Delete"
        onCancel={() => setDeletingFile(null)}
        onConfirm={() => {
          if (fileSelected.length > 0) {
            bulkDeleteFiles({ deletes: fileSelected.map((sl) => sl._id) })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: `${fileSelected.length} Files Deleted successfully!` })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
              .finally(() => {
                clearfileSelected();
                setDeletingFile(null);
              });
          } else {
            deleteFile(deletingFile._id)
              .unwrap()
              .then(() => dispatch(showSuccess({ message: "File Deleted successfully" })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong" })))
              .finally(() => {
                clearfileSelected();
                setDeletingFile(null);
              });
          }
        }}
      />
    </>
  );
}
