import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ! MATERIAL IMPORTS
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
// ! COMPONENT IMPORTS
import { EnhancedTableHead } from "../../../components/TableDependencies/TableDependencies";
import TableEditStatusButton from "../../../components/TableEditStatusButton/TableEditStatusButton";
import TableMassActionButton from "../../../components/TableMassActionButton/TableMassActionButton";
// !IMAGES IMPORTS
import storeIcon from "../../../assets/images/users/collection_defaultdp.svg";
import unArchived from "../../../assets/images/Components/Archived.png";
// import storeIcon from "../../../assets/icons/storeIcon.svg";
// ! MATERIAL ICONS IMPORTS
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import TableLoader from "../../../components/Loader/TableLoader";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import ArchiveModal from "../../../components/ArchiveModal/ArchiveModal";
import { useDeleteStoreMutation, useEditStoreMutation } from "../../../features/products/inventory/inventoryApiSlice";
import { useDispatch } from "react-redux";
import { showSuccess, showError } from "../../../features/snackbar/snackbarAction";
import { DeleteModalSecondary } from "../../../components/DeleteModal/DeleteModal";
import { UnArchivedModal } from "../../../components/UnArchiveModal/UnArchiveModal";

export default function AllInventory({
  list = [],
  error = null,
  totalCount = 0,
  tabIndex = 0,
  isLoading = true,
  rowsPerPage = 10,
  changeRowsPerPage = () => {},
  changePage = () => {},
  page = 0,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("selectStore");
  const [selected, setSelected] = useState([]);

  const headCells = [
    {
      id: "selectStore",
      numeric: false,
      disablePadding: true,
      label: "Select Store",
    },
    {
      id: "noOfProducts",
      numeric: false,
      disablePadding: false,
      label: "No. of Products",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: true,
      label: "Actions",
    },
  ];

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = list.map((n) => n.sId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    changeRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const handleUnArchive = (id, title) => {
  //   setForMassAction(false);
  //   setShowUnArhcivedModal(true);
  //   setUnArchiveID(id);
  //   setName(title);
  // };

  const [editStoreMutation] = useEditStoreMutation();

  const [archiveStore, setArchiveStore] = useState({});

  const handleArchiveClick = (store) => {
    setArchiveStore(store);
    // setForMassAction(false);
  };

  const handleArchiveClose = () => {
    setArchiveStore({});
    // setForMassAction(false);
  };

  const handleArchiveConfirm = () => {
    // setForMassAction(false);
    editStoreMutation({ id: archiveStore._id, details: { status: "archieved" } })
      .unwrap()
      .then(() => dispatch(showSuccess({ message: "Store archived successfully!" })))
      .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
      .finally(() => setArchiveStore({}));
  };

  const [unarchiveStore, setUnarchiveStore] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState("");

  const handleUnarchiveClick = (store) => {
    setUnarchiveStore(store);
    setUpdatedStatus("in-active");
    // setForMassAction(false);
  };

  const handleUnarchiveClose = () => {
    setUnarchiveStore({});
    // setForMassAction(false);
  };

  const handleUnarchiveConfirm = () => {
    // setForMassAction(false);
    editStoreMutation({ id: unarchiveStore._id, details: { status: updatedStatus } })
      .unwrap()
      .then(() => dispatch(showSuccess({ message: "Store un-archived successfully!" })))
      .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
      .finally(() => setUnarchiveStore({}));
  };

  const [deleteStoreMutation] = useDeleteStoreMutation();

  const [deleteStore, setDeleteStore] = useState({});

  const handleDeleteClick = (store) => {
    setDeleteStore(store);
    // setForMassAction(false);
  };

  const handleDeleteClose = () => {
    setDeleteStore({});
    // setForMassAction(false);
  };

  const handleDeleteConfirm = () => {
    // setForMassAction(false);
    deleteStoreMutation(deleteStore._id)
      .unwrap()
      .then(() => dispatch(showSuccess({ message: "Store deleted successfully!" })))
      .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
      .finally(() => setDeleteStore({}));
  };

  return (
    <>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} collections are selected&nbsp;
              <span
                className="text-blue-2 c-pointer"
                onClick={() => setSelected([])}>
                (Clear Selection)
              </span>
            </small>
          </button>
          <TableEditStatusButton />
          <TableMassActionButton />
        </div>
      )}
      {!error ? (
        list.length ? (
          <>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={list.length}
                  headCells={tabIndex === 0 || tabIndex === 3 ? headCells : headCells.toSpliced(2, 1)}
                />
                <TableBody>
                  {/* {stableSort(list, getComparator(order, orderBy)).map((row, index) => { */}
                  {list.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        className="table-rows">
                        {/* CheckBox Cell */}
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(event) => handleClick(event, row._id)}
                            size="small"
                            style={{
                              color: "#5C6D8E",
                            }}
                          />
                        </TableCell>
                        {/* Image n Store Info Cell */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none">
                          <Link
                            className="text-decoration-none"
                            to={`details/${row?._id}`}>
                            <div className="d-flex align-items-center py-3">
                              <img
                                src={row.mediaUrl?.[0]?.image ?? storeIcon}
                                alt="storeIcon"
                                className="me-2"
                                height={45}
                                width={45}
                              />
                              <div>
                                <p className="text-lightBlue rounded-circle fw-600">{row.name}</p>
                                <small className="text-grey-6 mt-1">
                                  {row.address.line1} {row.address.line2} {row.address.state.name} {row.address.pincode}{" "}
                                  {row.address.country.name}
                                </small>
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        {/* No. of Products Cell */}
                        <TableCell style={{ width: 180 }}>
                          <p className="text-lightBlue">{row.noOfProducts}</p>
                        </TableCell>
                        {/* Status Cell */}
                        {(tabIndex === 0 || tabIndex === 3) && (
                          <TableCell style={{ width: 140, padding: 0 }}>
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-pill d-flex table-status px-2 py-1 c-pointer"
                                style={{
                                  backgroundColor:
                                    row.status === "active"
                                      ? "#A6FAAF"
                                      : row.status === "archieved"
                                      ? "#C8D8FF"
                                      : "#F67476",
                                }}>
                                <small className="text-capitalize text-black fw-400">
                                  {row.status === "archieved" ? "archived" : row.status}
                                </small>
                              </div>
                            </div>
                          </TableCell>
                        )}
                        {/* Actions Cell */}
                        <TableCell style={{ width: 140, padding: 0 }}>
                          {tabIndex !== 3 ? (
                            <div className="d-flex align-items-center">
                              <Tooltip
                                title="Edit"
                                placement="top">
                                <div
                                  onClick={() => navigate({ pathname: `details/${row?._id}` })}
                                  className="table-edit-icon rounded-4 p-2">
                                  <EditOutlinedIcon
                                    sx={{
                                      color: "#5c6d8e",
                                      fontSize: 18,
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </Tooltip>
                              <Tooltip
                                title="Archive"
                                placement="top">
                                <div
                                  onClick={() => handleArchiveClick(row)}
                                  className="table-edit-icon rounded-4 p-2">
                                  <InventoryIcon
                                    sx={{
                                      color: "#5c6d8e",
                                      fontSize: 18,
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </Tooltip>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center">
                              <Tooltip
                                title="Un-Archive"
                                placement="top">
                                <div
                                  onClick={() => handleUnarchiveClick(row)}
                                  className="table-edit-icon rounded-4 p-2">
                                  <InventoryIcon
                                    sx={{
                                      color: "#5c6d8e",
                                      fontSize: 18,
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </Tooltip>
                              <Tooltip
                                title="Delete"
                                placement="top">
                                <div
                                  onClick={() => handleDeleteClick(row)}
                                  className="table-edit-icon rounded-4 p-2">
                                  <DeleteIcon
                                    sx={{
                                      color: "#5c6d8e",
                                      fontSize: 18,
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </Tooltip>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table-pagination"
            />
          </>
        ) : isLoading ? (
          <span className="d-flex justify-content-center m-3">
            <TableLoader />
          </span>
        ) : (
          <span className="d-flex justify-content-center m-3">
            <NoDataFound />
          </span>
        )
      ) : (
        <></>
      )}
      <ArchiveModal
        title={"Store Inventory"}
        show={!!archiveStore?._id}
        products={"x products"}
        onConfirm={handleArchiveConfirm}
        onCancel={handleArchiveClose}
        message={archiveStore?.name}
        archiveType={" store"}
        // message={forMassAction == true ? (selected.length == 1 ? singleTitle : selected.length) : collectionTitle}
        // archiveType={forMassAction == true ? (selected.length == 1 ? " collection" : " collections") : " collection"}
      />
      <DeleteModalSecondary
        // message={forMassAction == false ? name : selected.length == 1 ? singleTitle : selected.length}
        // title={forMassAction == true ? (selected.length == 1 ? " collection" : " collections") : " collection"}
        title={" store"}
        show={!!deleteStore?._id}
        message={deleteStore?.name}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteClose}
      />
      <UnArchivedModal
        onConfirm={handleUnarchiveConfirm}
        onCancel={handleUnarchiveClose}
        show={!!unarchiveStore?._id}
        title={"Un-Archive Store ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${unarchiveStore?.name}</span>,`}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={setUpdatedStatus}
        icon={unArchived}
        name={unarchiveStore?.name}
        nameType={" store"}
        // name={forMassAction == false ? name : selected.length == 1 ? singleTitle : selected.length}
        // nameType={forMassAction == true ? (selected.length == 1 ? " collection" : " collections") : " collection"}
      />
    </>
  );
}
