import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, TableBody, TableContainer, Tooltip } from "@mui/material";
import { showError, showSuccess } from "../../../../features/snackbar/snackbarAction";
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
import arrowLeft from "../../../../assets/icons/arrowLeft.svg";
import info from "../../../../assets/icons/info.svg";
import FolderNameDialog from "../FolderNameDialog";
import DeleteAlertDialog from "../DeleteAlertDialog";
import TableMassActionButton from "../../../../components/TableMassActionButton/TableMassActionButton";
import ImageIconView from "../AllFiles/ImageIconView";
import VideoIconView from "../AllFiles/VideoIconView";
import FolderMoveInDialog from "../FolderMoveInDialog";
import { EnhancedTableHead } from "../../../../components/TableDependencies/TableDependencies";
import ImageListView from "../AllFiles/ImageListView";
import VideoListView from "../AllFiles/VideoListView";

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

export default function FoldersInside({ views = "icon", folder = {}, onPopup = () => {}, queryFilters = {}, goBack = () => {} }) {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);

  const clearSelected = () => setSelected([]);

  // const { data: allFoldersData } = useGetFoldersQuery({ ...queryFilters, id: folder });
  // const folder = allFoldersData?.data?.data?.[0];
  // const allImages = folder?.result?.filter((fl) => fl.fileType === "image");
  // const allVideos = folder?.result?.filter((fl) => fl.fileType === "video");

  const { data: allImagesData } = useGetFilesQuery({ ...queryFilters, fileType: "image", folderId: folder._id });
  const allImages = allImagesData?.data?.data ?? [];

  const { data: allVideosData } = useGetFilesQuery({ ...queryFilters, fileType: "video", folderId: folder._id });
  const allVideos = allVideosData?.data?.data ?? [];

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

  const handleBulkActionSelect = (action) => {
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
  };

  return (
    <div className="my-3">
      <div className="row mb-3">
        <div className="col d-flex align-items-center">
          <h4 className="fs-6 fw-500 me-2">
            <span
              onClick={goBack}
              className="text-grey-6 c-pointer">
              All / Folders /
            </span>{" "}
            <span className="text-lightBlue">{folder.name}</span>
          </h4>
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
      </div>

      {views === "list" && (
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
        </div>
      )}

      {/* <hr className="hr-grey-6 mt-4" /> */}

      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} files are selected{" "}
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
            defaultValue={["Move To Folder", "Delete"]}
          />
        </div>
      )}

      {views === "icon" && (
        <>
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <h4 className="text-lightBlue fs-6 fw-500 me-2">Images</h4>
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
          </div>

          <div className="row align-items-center">
            {allImages.map((image) => (
              <div
                key={image._id}
                className="col-2 my-2">
                <ImageIconView
                  file={image}
                  isSelected={selected.includes(image)}
                  onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                  onDoubleClick={onPopup}
                  onCopyLink={handleCopyLink}
                  onMoveToFolder={(file) => setMovingFile(file)}
                  onRename={(file) => setRenamingFile(file)}
                  onDownload={handleDownloadFile}
                  onDelete={(file) => setDeletingFile(file)}
                />
              </div>
            ))}
          </div>

          <hr className="hr-grey-6 mt-4" />

          <div className="row mb-3">
            <div className="col d-flex align-items-center">
              <h4 className="text-lightBlue fs-6 fw-500 me-2">Videos</h4>
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
          </div>

          <div className="row align-items-center">
            {allVideos.map((video) => (
              <div
                key={video._id}
                className="col-2 my-2">
                <VideoIconView
                  file={video}
                  isSelected={selected.includes(video)}
                  onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                  onDoubleClick={onPopup}
                  onCopyLink={handleCopyLink}
                  onMoveToFolder={(file) => setMovingFile(file)}
                  onRename={(file) => setRenamingFile(file)}
                  onDownload={handleDownloadFile}
                  onDelete={(file) => setDeletingFile(file)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {views === "list" && (
        <TableContainer>
          <Table size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={(e) => setSelected(e.target.checked ? [...allImages, ...allVideos] : [])}
              rowCount={allImages.length + allVideos.length}
              headCells={headCells}
            />
            <TableBody>
              {allImages.map((image) => (
                <ImageListView
                  file={image}
                  isSelected={selected.includes(image)}
                  onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                  onDoubleClick={onPopup}
                  onCopyLink={handleCopyLink}
                  onMoveToFolder={(file) => setMovingFile(file)}
                  onRename={(file) => setRenamingFile(file)}
                  onDownload={handleDownloadFile}
                  onDelete={(file) => setDeletingFile(file)}
                />
              ))}
              {allVideos.map((video) => (
                <VideoListView
                  file={video}
                  isSelected={selected.includes(video)}
                  onSelect={(check, file) => setSelected(check ? selected.concat(file) : selected.filter((sl) => !Object.is(sl, file)))}
                  onDoubleClick={onPopup}
                  onCopyLink={handleCopyLink}
                  onMoveToFolder={(file) => setMovingFile(file)}
                  onRename={(file) => setRenamingFile(file)}
                  onDownload={handleDownloadFile}
                  onDelete={(file) => setDeletingFile(file)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <FolderNameDialog
        isOpen={!!renamingFile}
        buttonText="Rename"
        headingText="Rename File"
        folderName={renamingFile?.name ?? ""}
        onClose={() => setRenamingFile(null)}
        onAction={(name = "") => {
          editFile({ id: renamingFile._id, fileData: { name } })
            .unwrap()
            .then(() => dispatch(showSuccess({ message: "File Renamed successfully" })))
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
              .then(() => dispatch(showSuccess({ message: `${selected.length} Files Moved successfully!` })))
              .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
              .finally(() => {
                clearSelected();
                setDeletingFile(null);
              });
            clearSelected();
            setMovingFile(null);
          } else {
            editFile({ id: movingFile._id, fileData: { folderId } })
              .unwrap()
              .then(() => dispatch(showSuccess({ message: "File Moved successfully" })))
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
              .then(() => dispatch(showSuccess({ message: "File Deleted successfully" })))
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
}
