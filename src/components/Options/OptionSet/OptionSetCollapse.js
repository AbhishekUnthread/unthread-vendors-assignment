import { Grid } from "@mui/material";

import EditButton from "../../EditButton/EditButton";
import DeleteIconButton from "../../DeleteIconButton/DeleteIconButton";

const FRONTEND_APPEARANCE = {
  dropDownList: "Drop-Down List",
  dropDownThumbnail: "Drop-Down List with Thumbnail",
  colorAndImageSwatches: "Color & Image Swatches",
  radioButtons: "Radio Buttons",
  rectangleButtons: "Rectangle Buttons",
  circleButtons: "Circle Buttons",
};

const OptionSetCollapse = (props) => {
  const { onEdit, onOptionDelete, index, title, fieldType, attributes } = props;

  return (
    <div className="bg-black-13 border-grey-5 rounded-8 p-3 features mt-4 ">
      <Grid container style={{ gap: "10px" }}>
        <Grid item sm={12}>
          <Grid container alignItems="center">
            <Grid item sm={6}>
              <span className="text-lightBlue" style={{ fontSize: "15px" }}>
                {title}
              </span>
            </Grid>
            <Grid
              item
              sm={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                className="small"
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                }}
              >
                <span className="text-grey-6">
                  Input Field Type:{" "}
                  <span className="text-lightBlue">{fieldType}</span>
                </span>
              </div>
              <EditButton onClick={onEdit} />
              <DeleteIconButton
                onClick={onOptionDelete.bind(null, {
                  deleteIndex: index,
                  message: "option",
                })}
                title="Delete"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {attributes.map((attr) => {
              return (
                <div
                  key={attr._id}
                  className="rounded-pill d-flex align-items-center px-2 py-1 c-pointer"
                  style={{
                    background:
                      "linear-gradient(303.01deg, #2f2e69 -4.4%, #514969 111.29%)",
                  }}
                >
                  {attr?.imageUrl && (
                    <img
                      src={attr?.imageUrl}
                      alt="icon"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                      }}
                      className="me-2"
                    />
                  )}
                  {attr?.colour && (
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: attr?.colour,
                      }}
                      className="me-2"
                    />
                  )}
                  <small className="fw-400 text-lightBlue">
                    {`${attr.title} ${
                      attr?.metaSubAttributes?.length
                        ? `(${attr.metaSubAttributes.length})`
                        : ""
                    }`}
                  </small>
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OptionSetCollapse;
