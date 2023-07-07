import { useId } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = (props) => {
  const { headCells } = props;
  const headCellId = useId();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={`${headCellId}-${index}`}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            width={headCell.width}
          >
            <p className="text-lightBlue fw-600">{headCell.label}</p>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
