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
  const { formik, index } = props;

  const imageUploadHandler = (url) => {
    console.log(url);
  };

  // title: "",
  // attribute: optionsData?.data[0]._id,
  // colour: "",
  // imageUrl: "",
  // type: "optionset",
  // value: "",
  // apperance: optionFormik.values.apperance,

  // console.log(formik.touched, formik.errors);

  return (
    <Grid container>
      <Grid item sm={10.5} sx={{ display: "grid", alignItems: "center" }}>
        <Grid container columnSpacing={2}>
          <Grid item sm={4} sx={{ display: "grid", alignItems: "center" }}>
            <FormControl className="w-100 px-0">
              <OutlinedInput
                size="small"
                name={`[${index}].title`}
                value={formik.values[index]?.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {!!formik.touched[index]?.title &&
                formik.errors[index]?.title && (
                  <FormHelperText error>
                    {formik.errors[index]?.title}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>
          <Grid item sx={{ display: "grid", alignItems: "center" }}>
            <UploadMediaSmall
              fileSrc={formik.values[index]?.imageUrl}
              error={formik.errors[index]?.imageUrl}
              onUpload={imageUploadHandler}
              onBlur={formik.handleBlur}
              name={`[${index}].imageUrl`}
              disableLabel={true}
              style={{ alignSelf: "start" }}
            />
          </Grid>
          {/* <Grid item sx={{ display: "grid", alignItems: "center" }}>
            <Grid container columnSpacing={2}>
              <Grid item sx={{ display: "grid", alignItems: "center" }}>
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
                    value=''
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
                </FormControl>
              </Grid>
              <Grid item sx={{ display: "grid", alignItems: "center" }}>
                <UploadMediaSmall disableLabel={true} />
              </Grid>
              <Grid item sx={{ display: "grid", alignItems: "center" }}>
                <ColorInput />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid
        item
        sm={1.5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <AddIconButton title="Add" />
        <DeleteIconButton title="Delete" />
      </Grid>
    </Grid>
  );
};

export default Attribute;
