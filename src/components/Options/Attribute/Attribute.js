import { useCallback } from "react";
import {
  Grid,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { UploadMediaSmall } from "../../UploadMediaBox/UploadMedia";
import ColorInput from "../../ColorInput/ColorInput";
import AddIconButton from "../../AddIconButton/AddIconButton";
import DeleteIconButton from "../../DeleteIconButton/DeleteIconButton";

const CUSTOM_FIELD_DISPLAY = [
  {
    id: uuidv4(),
    text: "Color",
    value: "colour",
  },
  {
    id: uuidv4(),
    text: "Image",
    value: "imageUrl",
  },
];

const Attribute = (props) => {
  const { formik, index, onAttributeDelete, onSubOptionAdd, subOptionCount } =
    props;

  const imageUploadHandler = useCallback((url) => {
    formik.setFieldValue(`attributes[${index}].imageUrl`, url);
  }, []);

  const changeAttributeValueHandler = (e) => {
    formik.setFieldValue(`attributes[${index}].value`, e.target.value);
    if (e.target.value === "imageUrl") {
      formik.setFieldValue(`attributes[${index}].colour`, "");
    } else {
      formik.setFieldValue(`attributes[${index}].imageUrl`, "");
      formik.setFieldValue(`attributes[${index}].colour`, "#000000");
    }
  };

  const changeTitleHandler = (e) => {
    const isDuplicate = formik.values?.attributes.find((attr) => {
      return (
        attr.title?.toLowerCase().trim() === e.target.value.toLowerCase().trim()
      );
    });
    formik.handleChange(e);
    if (isDuplicate && isDuplicate.title && e.target.value.trim()) {
      formik.setFieldValue(
        `attributes[${index}].error`,
        `${isDuplicate.title} already exists`
      );
      return;
    }
    formik.setFieldValue(`attributes[${index}].error`, "");
  };

  return (
    <Grid container>
      <Grid item sm={9} sx={{ display: "grid", alignItems: "center" }}>
        <Grid container columnSpacing={2}>
          <Grid item sm={4} sx={{ display: "grid", alignItems: "start" }}>
            <FormControl className="w-100 px-0">
              <OutlinedInput
                size="small"
                name={`attributes[${index}].title`}
                value={formik.values?.attributes[index]?.title}
                onBlur={formik.handleBlur}
                onChange={changeTitleHandler}
              />
              {(formik.touched?.attributes?.length &&
                formik.errors?.attributes?.length &&
                !!formik.touched?.attributes[index]?.title &&
                formik.errors?.attributes[index]?.title) ||
              (formik.touched?.attributes?.length &&
                !!formik.touched?.attributes[index]?.title &&
                formik.values?.attributes[index]?.error) ? (
                <FormHelperText error>
                  {formik.values?.attributes[index]?.error
                    ? formik.values?.attributes[index]?.error
                    : formik?.errors?.attributes[index]?.title}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          {formik.values.option?.apperance === "dropDownThumbnail" && (
            <Grid item sx={{ display: "grid", alignItems: "center" }}>
              <UploadMediaSmall
                fileSrc={formik.values.attributes[index]?.imageUrl}
                error={
                  formik.errors?.attributes?.length &&
                  formik.errors.attributes[index]?.imageUrl
                }
                onUpload={imageUploadHandler}
                onBlur={formik.handleBlur}
                name={`attributes[${index}].imageUrl`}
                disableLabel={true}
                style={{ alignSelf: "start" }}
                isSubmitting={formik.isSubmitting}
              />
            </Grid>
          )}
          {formik.values.option?.apperance === "colorAndImageSwatches" && (
            <Grid item sx={{ display: "grid", alignItems: "start" }}>
              <Grid container columnSpacing={2}>
                <Grid item sx={{ display: "grid", alignItems: "start" }}>
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
                      name={`attributes[${index}].value`}
                      value={formik.values.attributes[index]?.value}
                      onBlur={formik.handleBlur}
                      onChange={changeAttributeValueHandler}
                    >
                      {CUSTOM_FIELD_DISPLAY.map((option) => {
                        return (
                          <MenuItem
                            key={option.id}
                            value={option.value}
                            sx={{ fontSize: 13, color: "#5c6d8e" }}
                          >
                            {option.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formik.touched?.attributes?.length &&
                    formik.errors?.attributes?.length &&
                    !!formik.touched.attributes[index]?.value &&
                    formik.errors.attributes[index]?.value ? (
                      <FormHelperText error>
                        {formik.errors.attributes[index]?.value}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {formik.values.attributes[index]?.value === "imageUrl" && (
                  <Grid item sx={{ display: "grid", alignItems: "center" }}>
                    <UploadMediaSmall
                      fileSrc={formik.values.attributes[index]?.imageUrl}
                      error={
                        formik.errors?.attributes?.length &&
                        formik.errors.attributes[index]?.imageUrl
                      }
                      onUpload={imageUploadHandler}
                      onBlur={formik.handleBlur}
                      name={`attributes[${index}].imageUrl`}
                      disableLabel={true}
                      style={{ alignSelf: "start" }}
                      isSubmitting={formik.isSubmitting}
                    />
                  </Grid>
                )}
                {formik.values.attributes[index]?.value === "colour" && (
                  <Grid item sx={{ display: "grid", alignItems: "center" }}>
                    <FormControl>
                      <ColorInput
                        inputProps={{
                          name: `attributes[${index}].colour`,
                          value: formik.values.attributes[index]?.colour,
                          onBlur: formik.handleBlur,
                          onChange: formik.handleChange,
                        }}
                      />
                      {formik.touched?.attributes?.length &&
                      formik.errors?.attributes?.length &&
                      !!formik.touched.attributes[index]?.colour &&
                      formik.errors.attributes[index]?.colour ? (
                        <FormHelperText error>
                          {formik.errors.attributes[index]?.colour}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item sm={2} sx={{ display: "grid", alignItems: "center" }}>
        <div
          className="small"
          style={{
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          <span className="text-grey-6">
            Inner Groups:{" "}
            <span className="text-lightBlue">{subOptionCount}</span>
          </span>
        </div>
      </Grid>
      <Grid
        item
        sm={1}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <AddIconButton
          onClick={onSubOptionAdd.bind(
            null,
            formik.values.attributes[index]?._id
          )}
          title="Add"
        />
        <DeleteIconButton
          onClick={onAttributeDelete.bind(null, {
            deleteId: formik.values.attributes[index]?._id,
            saved: formik.values.attributes[index]?.saved,
            message: formik.values.attributes[index]?.title
              ? `${formik.values.attributes[index]?.title} attribute`
              : "attribute",
          })}
          title="Delete"
        />
      </Grid>
    </Grid>
  );
};

export default Attribute;
