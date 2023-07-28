import {
  FormControl,
  OutlinedInput,
  Tooltip,
  Grid,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";

import DeleteIconButton from "../../DeleteIconButton/DeleteIconButton";
import Attribute from "./Attribute";
import TableHeader from "../../TableHeader/TableHeader";

import info from "../../../assets/icons/info.svg";

const DragHandle = SortableHandle(() => (
  <TableCell sx={{ padding: "16px 0", verticalAlign: "top" }}>
    <DragIndicatorIcon
      sx={{
        color: "#5c6d8e",
        fontSize: 26,
        cursor: "pointer",
        marginTop: "5px",
      }}
    />
  </TableCell>
));

const TableBodySortable = SortableContainer(({ children }) => (
  <TableBody>{children}</TableBody>
));

TableBodySortable.muiName = "TableBody";

const SortableRow = SortableElement(({ children }) => children);

const HEAD_CELLS = [
  {
    align: "left",
    disablePadding: true,
    label: "",
    width: "1%",
  },
  {
    align: "left",
    disablePadding: false,
    label: "Data Values",
    width: "99%",
  },
];

const FRONTEND_APPEARANCE = [
  {
    id: 1,
    value: "dropDownList",
    text: "Drop-Down List",
  },
  {
    id: 2,
    value: "dropDownThumbnail",
    text: "Drop-Down List with Thumbnail",
  },
  {
    id: 3,
    value: "colorAndImageSwatches",
    text: "Color & Image Swatches",
  },
  {
    id: 4,
    value: "radioButtons",
    text: "Radio Buttons",
  },
  {
    id: 5,
    value: "rectangleButtons",
    text: "Rectangle Buttons",
  },
  {
    id: 6,
    value: "circleButtons",
    text: "Circle Buttons",
  },
];

const SubAttribute = () => {
  return (
    <div className="bg-black-13 border-grey-5 rounded-8 p-3 features mt-4 ">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr auto auto",
          gap: "15px",
          marginBottom: "15px",
        }}
      >
        <div>
          <div className="d-flex mb-1">
            <label className="small text-lightBlue me-2">Option Name</label>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className=" c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <FormControl className="w-100 px-0">
            <OutlinedInput size="small" sx={{ paddingLeft: 0 }} name="title" />
          </FormControl>
        </div>
        <div>
          <div className="d-flex  mb-1">
            <p className="text-lightBlue me-2">Frontend Appearance</p>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className=" c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <FormControl
            sx={{
              m: 0,
              minWidth: 120,
              width: "100%",
            }}
            size="small"
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              size="small"
              value=""
            >
              {FRONTEND_APPEARANCE.map((appearance) => {
                return (
                  <MenuItem
                    key={appearance.id}
                    value={appearance.value}
                    sx={{ fontSize: 13, color: "#5c6d8e" }}
                  >
                    {appearance.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="d-flex align-items-end" style={{ gap: "15px" }}>
          <DeleteIconButton title="Delete" />
          <LoadingButton
            className="button-gradient py-2 px-4 w-auto"
            type="button"
          >
            <p>Save</p>
          </LoadingButton>
        </div>
      </div>
      <TableContainer sx={{ padding: 0 }}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHeader sx={{ background: "#22213f" }} headCells={HEAD_CELLS} />
          <TableBodySortable useDragHandle>
            <SortableRow index={1}>
              <TableRow tabIndex={-1} className="table-rows">
                <DragHandle />
                <TableCell
                  sx={{ textTransform: "capitalize", cursor: "pointer" }}
                >
                  <Attribute />
                </TableCell>
              </TableRow>
            </SortableRow>

            <TableRow tabIndex={-1} className="table-rows">
              <TableCell sx={{ padding: "0 16px" }}></TableCell>
              <TableCell sx={{ padding: "0 16px" }}>
                <button type="button" className="reset link">
                  <p>+ Add Input Field</p>
                </button>
              </TableCell>
            </TableRow>
          </TableBodySortable>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubAttribute;