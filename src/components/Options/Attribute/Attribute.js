import {
  Grid,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
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

const Attribute = () => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item sx={{ display: "grid", alignItems: "center" }}>
        <FormControl className="w-100 px-0">
          <OutlinedInput size="small" name="" />
        </FormControl>
      </Grid>
      {/* <Grid item sx={{ display: "grid", alignItems: "center" }}>
        <UploadMediaSmall disableLabel={true} />
      </Grid>
      <Grid item sx={{ display: "grid", alignItems: "center" }}>
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
      <Grid item sx={{ display: "grid", alignItems: "center" }}>
        <AddIconButton title="Add" />
      </Grid>
      <Grid item sx={{ display: "grid", alignItems: "center" }}>
        <DeleteIconButton title="Delete" />
      </Grid>
    </Grid>
  );
};

export default Attribute;
