import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ! MATERIAL IMPORTS
import { Checkbox, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip } from "@mui/material";
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
import {
  useBulkDeleteStoreMutation,
  useBulkEditStoreMutation,
  useDeleteStoreMutation,
  useEditStoreMutation,
} from "../../../features/products/inventory/inventoryApiSlice";
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

  // console.log(selected);

  const handleSelectAllClick = (checked) => setSelected(checked ? list.map((l) => l._id) : []);

  const handleSelectOneClick = (checked, id) => setSelected((sl) => (checked ? sl.concat(id) : sl.filter((l) => l !== id)));

  const clearSelected = () => setSelected([]);

  const isSelected = (id) => selected.includes(id);

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

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    changeRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };

  // const handleUnArchive = (id, title) => {
  //   setForMassAction(false);
  //   setShowUnArhcivedModal(true);
  //   setUnArchiveID(id);
  //   setName(title);
  // };

  const [editStoreMutation] = useEditStoreMutation();

  const [archiveStore, setArchiveStore] = useState(null);

  const handleArchiveClick = (store) => {
    clearSelected();
    setArchiveStore(store);
    // setForMassAction(false);
  };

  const handleArchiveClose = () => {
    clearSelected();
    setArchiveStore(null);
    // setForMassAction(false);
  };

  const handleArchiveConfirm = () => {
    // setForMassAction(false);
    if (selected.length > 0) handleBulkStatusSelect("Set as Archived");
    else
      editStoreMutation({ id: archiveStore?._id, details: { status: "archieved" } })
        .unwrap()
        .then(() => dispatch(showSuccess({ message: "Store archived successfully!" })))
        .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
        .finally(() => {
          clearSelected();
          setArchiveStore(null);
        });
  };

  const [unarchiveStore, setUnarchiveStore] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("in-active");

  const handleUnarchiveClick = (store) => {
    clearSelected();
    setUnarchiveStore(store);
    setUpdatedStatus("in-active");
    // setForMassAction(false);
  };

  const handleUnarchiveClose = () => {
    clearSelected();
    setUnarchiveStore(null);
    setUpdatedStatus("in-active");
    // setForMassAction(false);
  };

  const handleUnarchiveConfirm = () => {
    // setForMassAction(false);
    if (selected.length > 0) handleBulkStatusSelect(updatedStatus);
    else
      editStoreMutation({ id: unarchiveStore?._id, details: { status: updatedStatus } })
        .unwrap()
        .then(() => dispatch(showSuccess({ message: "Store un-archived successfully!" })))
        .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
        .finally(() => {
          clearSelected();
          setUnarchiveStore(null);
          setUpdatedStatus("in-active");
        });
  };

  const [deleteStoreMutation] = useDeleteStoreMutation();

  const [deleteStore, setDeleteStore] = useState(null);

  const handleDeleteClick = (store) => {
    clearSelected();
    setDeleteStore(store);
  };

  const handleDeleteClose = () => {
    clearSelected();
    setDeleteStore(null);
  };

  const handleDeleteConfirm = () => {
    if (selected.length > 0) {
      bulkDeleteStoreMutation({ deletes: selected })
        .unwrap()
        .then(() => dispatch(showSuccess({ message: `${selected.length} Stores Deleted successfully!` })))
        .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
        .finally(() => {
          clearSelected();
          setDeleteStore(null);
        });
    } else {
      deleteStoreMutation(deleteStore?._id)
        .unwrap()
        .then(() => dispatch(showSuccess({ message: "Store deleted successfully!" })))
        .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
        .finally(() => {
          clearSelected();
          setDeleteStore(null);
        });
    }
  };

  const [bulkEditStoreMutation] = useBulkEditStoreMutation();
  const [bulkDeleteStoreMutation] = useBulkDeleteStoreMutation();

  const handleBulkStatusSelect = (statusText) => {
    const status = mapStatusText(statusText);
    console.log("handleBulkStatusSelect", statusText, status);
    bulkEditStoreMutation({ updates: selected.map((id) => ({ id, status })) })
      .unwrap()
      .then(() => dispatch(showSuccess({ message: `${selected.length} Stores ${statusText} successfully!` })))
      .catch((e) => dispatch(showError({ message: e.message ?? "Something went wrong!" })))
      .finally(() => {
        clearSelected();
        setArchiveStore(null);
        setUnarchiveStore(null);
        setDeleteStore(null);
        setUpdatedStatus("in-active");
      });
  };

  const handleBulkActionSelect = (statusText) => {
    console.log("handleBulkActionSelect", statusText);
    // const status = mapStatusText(statusText);
    switch (statusText) {
      case "Set as Archived":
        setArchiveStore({});
        break;
      case "Set as Un-Archived":
        setUnarchiveStore({});
        break;
      case "Delete":
        setDeleteStore({});
        break;

      default:
        clearSelected();
        break;
    }
  };

  return (
    <>
      {selected.length > 0 && (
        <div className="d-flex align-items-center px-2 mb-3">
          <button className="button-grey py-2 px-3">
            <small className="text-lightBlue">
              {selected.length} stores are selected{" "}
              <span
                className="text-blue-2 c-pointer"
                onClick={clearSelected}>
                (Clear Selection)
              </span>
            </small>
          </button>
          {tabIndex !== 3 && (
            <TableEditStatusButton
              onSelect={handleBulkStatusSelect}
              defaultValue={["Set as Active", "Set as In-Active"]}
              headingName="Edit Status"
            />
          )}
          <TableMassActionButton
            headingName="Mass Action"
            onSelect={handleBulkActionSelect}
            defaultValue={tabIndex !== 3 ? ["Edit", "Set as Archived"] : ["Delete", "Set as Un-Archived"]}
          />
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
                  onSelectAllClick={(e) => handleSelectAllClick(e.target.checked)}
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
                            inputProps={{ "aria-labelledby": labelId }}
                            onChange={(e) => handleSelectOneClick(e.target.checked, row._id)}
                            size="small"
                            style={{ color: "#5C6D8E" }}
                          />
                        </TableCell>
                        {/* Image n Store Info Cell */}
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none">
                          {tabIndex === 3 ? (
                            <div className="d-flex align-items-center py-3">
                              <img
                                src={row.mediaUrl?.[0]?.image ?? storeIcon}
                                alt="storeIcon"
                                className="me-2 rounded-4"
                                height={45}
                                width={45}
                              />
                              <div>
                                <p className="text-lightBlue rounded-circle fw-600">{row.name}</p>
                                <small className="text-grey-6 mt-1">
                                  {row.address.line1} {row.address.line2} {row.address.state.name} {row.address.pincode} {row.address.country.name}
                                </small>
                              </div>
                            </div>
                          ) : (
                            <Link
                              className="text-decoration-none"
                              to={`details/${row?._id}`}>
                              <div className="d-flex align-items-center py-3">
                                <img
                                  src={row.mediaUrl?.[0]?.image ?? storeIcon}
                                  alt="storeIcon"
                                  style={{ objectFit: "contain", overflow: "hidden" }}
                                  className="me-2 rounded-4"
                                  height={45}
                                  width={45}
                                />
                                <div>
                                  <p className="text-lightBlue rounded-circle fw-600">{row.name}</p>
                                  <small className="text-grey-6 mt-1">
                                    {row.address.line1} {row.address.line2} {row.address.state.name} {row.address.pincode} {row.address.country.name}
                                  </small>
                                </div>
                              </div>
                            </Link>
                          )}
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
                                  backgroundColor: row.status === "active" ? "#A6FAAF" : row.status === "archieved" ? "#C8D8FF" : "#F67476",
                                }}>
                                <small className="text-capitalize text-black fw-400">{row.status === "archieved" ? "archived" : row.status}</small>
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
        show={!!archiveStore}
        products={"x products"}
        onConfirm={handleArchiveConfirm}
        onCancel={handleArchiveClose}
        // message={archiveStore?.name ?? ""}
        message={selected.length > 0 ? selected.length : archiveStore?.name ?? ""}
        archiveType={selected.length > 1 ? " stores" : " store"}
        // message={forMassAction == true ? (selected.length == 1 ? singleTitle : selected.length) : collectionTitle}
        // archiveType={forMassAction == true ? (selected.length == 1 ? " collection" : " collections") : " collection"}
      />
      <DeleteModalSecondary
        // message={forMassAction == false ? name : selected.length == 1 ? singleTitle : selected.length}
        // title={forMassAction == true ? (selected.length == 1 ? " collection" : " collections") : " collection"}
        title={" store"}
        show={!!deleteStore}
        message={selected.length > 0 ? `${selected.length} stores` : deleteStore?.name ?? ""}
        // message={}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteClose}
      />
      <UnArchivedModal
        onConfirm={handleUnarchiveConfirm}
        onCancel={handleUnarchiveClose}
        show={!!unarchiveStore}
        title={"Un-Archive Store ?"}
        primaryMessage={`Before un-archiving <span class='text-blue-1'>${unarchiveStore?.name ?? ""}</span>,`}
        secondaryMessage={"Please set its status"}
        confirmText={"Un-Archive"}
        handleStatusValue={setUpdatedStatus}
        icon={unArchived}
        name={selected.length > 0 ? selected.length : unarchiveStore?.name ?? ""}
        nameType={selected.length > 1 ? " stores" : " store"}
        // name={forMassAction == false ? name : selected.length == 1 ? singleTitle : selected.length}
        // nameType={forMassAction == true ? (selected.length == 1 ? " collection" : " collections") : " collection"}
      />
    </>
  );
}

function mapStatusText(txt) {
  switch (txt) {
    case "Set as Active":
      return "active";
    case "Set as In-Active":
      return "in-active";
    case "Set as Archived":
      return "archieved";

    default:
      return txt;
  }
}
