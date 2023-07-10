import { useState, useEffect } from "react";
import {
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

const InputDropdown = (props) => {
  const { options, value, onChange, error, onBlur, name } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorInnerEl, setAnchorInnerEl] = useState(null);
  const [currentValue, setCurrentValue] = useState("");

  const handlePopover = (e) => {
    setAnchorEl((prevState) => {
      if (prevState) {
        return null;
      }
      setAnchorInnerEl(null);
      return e.currentTarget;
    });
  };
  const handleInnerPopover = (e) => {
    setAnchorInnerEl((prevState) => {
      if (prevState) {
        return null;
      }
      return e.currentTarget;
    });
  };

  const handleRadioChange = (value) => {
    onChange(value);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (value) {
      for (const option of options) {
        if (option.value === value) {
          setCurrentValue(option.title);
          break;
        } else if (option.children?.length) {
          for (const innerChild of option.children) {
            if (innerChild.value === value) {
              setCurrentValue(innerChild.title);
              break;
            }
          }
        }
      }
    } else {
      setCurrentValue("");
    }
  }, [value, options]);

  return (
    <>
      <FormControl className="w-100 px-0">
        <OutlinedInput
          value={currentValue}
          onClick={handlePopover}
          onFocus={handlePopover}
          onBlur={onBlur}
          name={name}
          size="small"
          readOnly
          endAdornment={
            <InputAdornment position="end">
              <UnfoldMoreIcon
                sx={{
                  color: "#5c6d8e",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              />
            </InputAdornment>
          }
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handlePopover}
        className="columns"
      >
        <FormControl className="px-2 py-2">
          {options?.length && (
            <div>
              {options.map((option) => {
                if (!option.children || !option.children?.length) {
                  return (
                    <button
                      key={option.id}
                      className="w-100 button-transparent me-1 py-2 px-2"
                      style={{ justifyContent: "flex-start", gap: "5px" }}
                      onClick={handleRadioChange.bind(null, option.value)}
                    >
                      {option.icon}
                      <Typography>{option.title}</Typography>
                    </button>
                  );
                } else {
                  return (
                    <div key={option.id}>
                      <button
                        className="w-100 button-transparent me-1 py-2 px-2"
                        style={{ justifyContent: "flex-start", gap: "5px" }}
                        onClick={handleInnerPopover}
                        onFocus={handleInnerPopover}
                      >
                        {option.icon}
                        <Typography>{option.title}</Typography>
                        <UnfoldMoreIcon
                          sx={{
                            color: "#5c6d8e",
                            fontSize: 14,
                            cursor: "pointer",
                            marginLeft: "auto",
                          }}
                        />
                      </button>
                      <Popover
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        open={!!anchorInnerEl}
                        anchorEl={anchorInnerEl}
                        onClose={handleInnerPopover}
                        className="columns"
                      >
                        <FormControl className="px-2 py-2">
                          <div>
                            {option.children.map((innerChildren) => {
                              return (
                                <button
                                  key={innerChildren.id}
                                  className="w-100 button-transparent me-1 py-2 px-2"
                                  style={{
                                    justifyContent: "flex-start",
                                    gap: "5px",
                                  }}
                                  onClick={handleRadioChange.bind(
                                    null,
                                    innerChildren.value
                                  )}
                                >
                                  {innerChildren.icon}
                                  <Typography>{innerChildren.title}</Typography>
                                </button>
                              );
                            })}
                          </div>
                        </FormControl>
                      </Popover>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </FormControl>
      </Popover>
    </>
  );
};

export default InputDropdown;