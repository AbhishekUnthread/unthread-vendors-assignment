import { 
    FormControl,
    OutlinedInput,
    Paper,
    Popover,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

import info from "../../assets/icons/info.svg";
import ringSmall from "../../assets/images/ringSmall.svg";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
// ? FILE UPLOAD STARTS HERE
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#38395c",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  justifyContent: "center",
  backgroundColor: "#1a1932",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
// ? FILE UPLOAD ENDS HERE

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Banner 1', 159, 6.0, 24, 4.0),
  createData('Banner 1', 237, 9.0, 37, 4.3),
  createData('Banner 1', 262, 16.0, 24, 6.0)
];

const UploadBanner = ({ imageName, headingName }) => {
  // ? FILE UPLOAD STARTS HERE
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  // ? FILE UPLOAD ENDS HERE

  // * SAVE FILTER POPOVERS STARTS
  const [anchorSaveFilterEl, setAnchorSaveFilterEl] = React.useState(null);
  const handleSaveFilterClick = (event) => {
    setAnchorSaveFilterEl(event.currentTarget);
  };
  const handleSaveFilterClose = () => {
    setAnchorSaveFilterEl(null);
  };
  const openSaveFilter = Boolean(anchorSaveFilterEl);
  const idSaveFilter = openSaveFilter ? "simple-popover" : undefined;
  // * SAVE FILTER POPOVERS ENDS

  return (
    <div className="bg-black-15 border-grey-5 rounded-8 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <h6 className="text-lightBlue fw-500">
            {headingName}
            <Tooltip title="Lorem ipsum" placement="top">
                <img
                    src={info}
                    alt="info"
                    className=" c-pointer"
                    width={13.5}
                />
            </Tooltip>
        </h6>
        <small
          className="text-lightBlue text-blue-2 c-pointer"
          aria-describedby={idSaveFilter}
          variant="contained"
          onClick={handleSaveFilterClick}
        >
          View
        </small>
      </div>
      <small className="mt-1 text-grey-6 font1">
        These banner will be see no PLP page as promotional banner
      </small>
      <div {...getRootProps({ style })} className="mt-3">
        <input
          id="primary"
          {...getInputProps()}
        />
        <img src={imageName} className="w-100" alt="" />
      </div>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell>
                    <div className="d-flex align-items-center">
                        <Tooltip title="Edit" placement="top">
                            <DragIndicatorIcon
                                sx={{
                                    color: "#5c6d8e",
                                    fontSize: 25,
                                    cursor: "pointer",
                                }}
                            />
                        </Tooltip>
                    </div>
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                >
                    <div className="d-flex align-items-center my-2">
                        <img
                            src={ringSmall}
                            alt="ringSmall"
                            className="me-2"
                            height={35}
                            width={35}
                        />
                        <div>
                        <p className="text-lightBlue fw-500">
                            {row.name}
                        </p>
                        <small className="mt-2 text-grey-4">
                            0.8mb
                        </small>
                        </div>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="d-flex align-items-center">
                        <Tooltip title="Edit" placement="top">
                            <div
                            className="table-edit-icon rounded-4 p-2"
                            >
                                <VisibilityOutlinedIcon
                                    sx={{
                                        color: "#5c6d8e",
                                        fontSize: 18,
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        </Tooltip>
                        <Tooltip title="Edit" placement="top">
                            <div
                            className="table-edit-icon rounded-4 p-2"
                            >
                                <LoopOutlinedIcon
                                    sx={{
                                        color: "#5c6d8e",
                                        fontSize: 18,
                                        cursor: "pointer",
                                    }}
                                />
                            </div>
                        </Tooltip>
                    </div>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UploadBanner;
