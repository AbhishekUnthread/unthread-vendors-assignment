import { useState, useCallback, useEffect } from "react";
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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContainer,
  SortableHandle,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import _ from "lodash";

import { showError } from "../../features/snackbar/snackbarAction";

import DeleteIconButton from "../DeleteIconButton/DeleteIconButton";
import SubAttribute from "./Attribute/SubAttribute";
import TableHeader from "../TableHeader/TableHeader";
import SubOptionCollapse from "./SubOptionCollapse";

import info from "../../assets/icons/info.svg";

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

const SubOption = (props) => {
  const {
    isEditing = false,
    id,
    attributeId,
    formik,
    index,
    onSubOptionDelete,
    onSubAttributeAdd,
    onSubAttributeDelete,
  } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [subAttrIndex, setSubAttrIndex] = useState([]);

  const subOptionAppearanceHandler = (e) => {
    formik.setFieldValue(`subOptions[${index}].apperance`, e.target.value);

    const subAttributeIndexes = _.keys(
      _.pickBy(formik.values.subAttributes, {
        metaSubAttribute: formik.values.subOptions[index]?._id,
      })
    );

    subAttributeIndexes.forEach((index) => {
      if (
        e.target.value !== "dropDownThumbnail" &&
        e.target.value !== "colorAndImageSwatches"
      ) {
        formik.setFieldValue(`subAttributes[${index}].value`, "");
      } else {
        formik.setFieldValue(`subAttributes[${index}].value`, "colour");
        formik.setFieldValue(`subAttributes[${index}].colour`, "#000000");
      }
      formik.setFieldValue(`subAttributes[${index}].apperance`, e.target.value);
    });
  };

  const changeTitleHandler = (e) => {
    const isDuplicate = formik.values?.subOptions.find((subOp) => {
      return (
        subOp.title?.toLowerCase().trim() ===
          e.target.value.toLowerCase().trim() &&
        subOp.metaAttribute === formik.values.subOptions[index]?.metaAttribute
      );
    });
    formik.handleChange(e);
    if (isDuplicate && isDuplicate.title && e.target.value.trim()) {
      formik.setFieldValue(
        `subOptions[${index}].error`,
        `${isDuplicate.title} already exists`
      );
      return;
    }
    formik.setFieldValue(`subOptions[${index}].error`, "");
  };

  const collapsedHandler = () => {
    let isError = false;

    if (formik.values?.subOptions?.length) {
      for (const key in formik.values?.subOptions[index]) {
        formik.setFieldTouched(`subOptions[${index}][${key}]`, true);
      }
    }
    if (subAttrIndex.length) {
      for (const subIndex of subAttrIndex) {
        for (const key in formik.values?.subAttributes[subIndex]) {
          formik.setFieldTouched(`subAttributes[${subIndex}][${key}]`, true);
        }
      }
    }
    if (formik.errors?.subOptions?.length && formik.errors?.subOptions[index]) {
      isError = true;
    } else if (subAttrIndex.length) {
      for (const subIndex of subAttrIndex) {
        if (
          formik.errors?.subAttributes?.length &&
          formik.errors?.subAttributes[subIndex]
        ) {
          isError = true;
        }
      }
    }
    if (isError) {
      return;
    }
    setCollapsed(true);
  };

  const editHandler = () => {
    setCollapsed(false);
  };

  const addSubAttributeIndexHandler = useCallback((value) => {
    setSubAttrIndex((prevState) => [...prevState, value]);
  }, []);

  return collapsed ? (
    <SubOptionCollapse
      id={id}
      attributeId={attributeId}
      formik={formik}
      index={index}
      onEdit={editHandler}
      onSubOptionDelete={onSubOptionDelete}
    />
  ) : (
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
            <label className="small text-lightBlue me-2">Data Title</label>
            <Tooltip title="Lorem ipsum" placement="top">
              <img src={info} alt="info" className=" c-pointer" width={13.5} />
            </Tooltip>
          </div>
          <FormControl className="w-100 px-0">
            <OutlinedInput
              size="small"
              sx={{ paddingLeft: 0 }}
              name={`subOptions[${index}].title`}
              value={formik.values.subOptions[index]?.title}
              onBlur={formik.handleBlur}
              onChange={changeTitleHandler}
            />
            {(formik.touched?.subOptions?.length &&
              formik.errors?.subOptions?.length &&
              !!formik.touched?.subOptions[index]?.title &&
              formik.errors?.subOptions[index]?.title) ||
            (formik.touched?.subOptions?.length &&
              !!formik.touched?.subOptions[index]?.title &&
              formik.values.subOptions[index]?.error) ? (
              <FormHelperText error>
                {formik.values.subOptions[index]?.error
                  ? formik.values.subOptions[index]?.error
                  : formik?.errors?.subOptions[index]?.title}
              </FormHelperText>
            ) : null}
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
              name={`subOptions[${index}].apperance`}
              value={formik.values.subOptions[index]?.apperance}
              onBlur={formik.handleBlur}
              onChange={subOptionAppearanceHandler}
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
            {formik.touched?.subOptions?.length &&
            formik.errors?.subOptions?.length &&
            !!formik.touched?.subOptions[index]?.apperance &&
            formik.errors?.subOptions[index]?.apperance ? (
              <FormHelperText error>
                {formik?.errors?.subOptions[index]?.apperance}
              </FormHelperText>
            ) : null}
          </FormControl>
        </div>

        <div
          className="d-flex align-items-start"
          style={{ gap: "15px", marginTop: "22px" }}
        >
          <DeleteIconButton
            onClick={onSubOptionDelete.bind(null, {
              deleteId: formik.values.subOptions[index]?._id,
              saved: formik.values.subOptions[index]?.saved,
              message: formik.values.subOptions[index]?.title
                ? `${formik.values.subOptions[index]?.title} sub option`
                : "sub option",
            })}
            title="Delete"
          />

          <button
            onClick={collapsedHandler}
            className="button-gradient py-2 px-4 w-auto"
            type="button"
          >
            <p>Save</p>
          </button>
        </div>
      </div>

      <TableContainer sx={{ padding: 0 }}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <TableHeader sx={{ background: "#22213f" }} headCells={HEAD_CELLS} />
          <TableBodySortable useDragHandle>
            {formik.values.subAttributes.map((subAttribute, index) => {
              if (subAttribute.metaSubAttribute === id) {
                return (
                  <SortableRow key={subAttribute._id} index={1}>
                    <TableRow tabIndex={-1} className="table-rows">
                      <DragHandle />
                      <TableCell
                        sx={{ textTransform: "capitalize", cursor: "pointer" }}
                      >
                        <SubAttribute
                          onMount={addSubAttributeIndexHandler}
                          formik={formik}
                          index={index}
                          onSubAttributeDelete={onSubAttributeDelete}
                        />
                      </TableCell>
                    </TableRow>
                  </SortableRow>
                );
              }
              return null;
            })}
            <TableRow tabIndex={-1} className="table-rows">
              <TableCell sx={{ padding: "0 16px" }}></TableCell>
              <TableCell sx={{ padding: "0 16px" }}>
                <button
                  onClick={onSubAttributeAdd.bind(null, {
                    attributeId,
                    subOptionId: id,
                  })}
                  type="button"
                  className="reset link"
                >
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

export default SubOption;
