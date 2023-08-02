import { useCallback, useEffect } from "react";
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

const SubAttribute = (props) => {
  const { formik, index, onSubAttributeDelete, onMount } = props;

  const imageUploadHandler = useCallback((url) => {
    formik.setFieldValue(`subAttributes[${index}].imageUrl`, url);
  }, []);

  const changeAttributeValueHandler = (e) => {
    formik.setFieldValue(`subAttributes[${index}].value`, e.target.value);
    if (e.target.value === "imageUrl") {
      formik.setFieldValue(`subAttributes[${index}].colour`, "");
    } else {
      formik.setFieldValue(`subAttributes[${index}].imageUrl`, "");
      formik.setFieldValue(`subAttributes[${index}].colour`, "#000000");
    }
  };

  const changeTitleHandler = (e) => {
    const isDuplicate = formik.values?.subAttributes.find((subAttr) => {
      return (
        subAttr.title?.toLowerCase().trim() ===
          e.target.value.toLowerCase().trim() &&
        subAttr.metaSubAttribute ===
          formik.values?.subAttributes[index]?.metaSubAttribute
      );
    });
    formik.handleChange(e);
    if (isDuplicate && isDuplicate.title && e.target.value.trim()) {
      formik.setFieldValue(
        `subAttributes[${index}].error`,
        `${isDuplicate.title} already exists`
      );
      return;
    }
    formik.setFieldValue(`subAttributes[${index}].error`, "");
  };

  useEffect(() => {
    index !== (null || undefined || "") && onMount(index);
  }, [index, onMount]);

  return (
    <Grid container>
      <Grid item sm={10.5} sx={{ display: "grid", alignItems: "center" }}>
        <Grid container columnSpacing={2}>
          <Grid item sm={4} sx={{ display: "grid", alignItems: "start" }}>
            <FormControl className="w-100 px-0">
              <OutlinedInput
                size="small"
                name={`subAttributes[${index}].title`}
                value={formik.values?.subAttributes[index]?.title}
                onBlur={formik.handleBlur}
                onChange={changeTitleHandler}
              />
              {(formik.touched?.subAttributes?.length &&
                formik.errors?.subAttributes?.length &&
                !!formik.touched?.subAttributes[index]?.title &&
                formik.errors?.subAttributes[index]?.title) ||
              (formik.touched?.subAttributes?.length &&
                !!formik.touched?.subAttributes[index]?.title &&
                formik.values?.subAttributes[index]?.error) ? (
                <FormHelperText error>
                  {formik.values?.subAttributes[index]?.error
                    ? formik.values?.subAttributes[index]?.error
                    : formik?.errors?.subAttributes[index]?.title}
                </FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          {formik.values?.subAttributes[index]?.apperance ===
            "dropDownThumbnail" && (
            <Grid item sx={{ display: "grid", alignItems: "center" }}>
              <UploadMediaSmall
                fileSrc={formik.values.subAttributes[index]?.imageUrl}
                error={
                  formik.errors?.subAttributes?.length &&
                  formik.errors.subAttributes[index]?.imageUrl
                }
                onUpload={imageUploadHandler}
                touched={
                  formik.touched?.subAttributes?.length &&
                  !!formik.touched.subAttributes[index]?.imageUrl
                }
                onBlur={formik.handleBlur}
                name={`subAttributes[${index}].imageUrl`}
                disableLabel={true}
                style={{ alignSelf: "start" }}
                isSubmitting={formik.isSubmitting}
              />
            </Grid>
          )}
          {formik.values?.subAttributes[index]?.apperance ===
            "colorAndImageSwatches" && (
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
                      name={`subAttributes[${index}].value`}
                      value={formik.values.subAttributes[index]?.value}
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
                    {formik.touched?.subAttributes?.length &&
                    formik.errors?.subAttributes?.length &&
                    !!formik.touched.subAttributes[index]?.value &&
                    formik.errors.subAttributes[index]?.value ? (
                      <FormHelperText error>
                        {formik.errors.subAttributes[index]?.value}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {formik.values.subAttributes[index]?.value === "imageUrl" && (
                  <Grid item sx={{ display: "grid", alignItems: "center" }}>
                    <UploadMediaSmall
                      fileSrc={formik.values.subAttributes[index]?.imageUrl}
                      error={
                        formik.errors?.subAttributes?.length &&
                        formik.errors.subAttributes[index]?.imageUrl
                      }
                      touched={
                        formik.touched?.subAttributes?.length &&
                        !!formik.touched.subAttributes[index]?.imageUrl
                      }
                      onUpload={imageUploadHandler}
                      onBlur={formik.handleBlur}
                      name={`subAttributes[${index}].imageUrl`}
                      disableLabel={true}
                      style={{ alignSelf: "start" }}
                      isSubmitting={formik.isSubmitting}
                    />
                  </Grid>
                )}
                {formik.values.subAttributes[index]?.value === "colour" && (
                  <Grid item sx={{ display: "grid", alignItems: "center" }}>
                    <FormControl>
                      <ColorInput
                        inputProps={{
                          name: `subAttributes[${index}].colour`,
                          value: formik.values.subAttributes[index]?.colour,
                          onBlur: formik.handleBlur,
                          onChange: formik.handleChange,
                        }}
                      />
                      {formik.touched?.subAttributes?.length &&
                      formik.errors?.subAttributes?.length &&
                      !!formik.touched.subAttributes[index]?.colour &&
                      formik.errors.subAttributes[index]?.colour ? (
                        <FormHelperText error>
                          {formik.errors.subAttributes[index]?.colour}
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
      <Grid
        item
        sm={1.5}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <DeleteIconButton
          onClick={onSubAttributeDelete.bind(null, {
            subOptionId: formik.values.subAttributes[index]?.metaSubAttribute,
            deleteId: formik.values.subAttributes[index]?._id,
            saved: formik.values.subAttributes[index]?.saved,
            message: formik.values.subAttributes[index]?.title
              ? `${formik.values.subAttributes[index]?.title} sub attribute`
              : "sub attribute",
          })}
          title="Delete"
        />
      </Grid>
    </Grid>
  );
};

export default SubAttribute;
