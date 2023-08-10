// ! IMAGES IMPORTS
import info from "../../../../assets/icons/info.svg";
// ! MATERIAL IMPORTS
import { Button, Tooltip } from "@mui/material";
import ImageIconView from "../AllFiles/ImageIconView";

const ImagesOnly = () => {
  return (
    <div className="my-3">
      <div className="row mb-3">
        <div className="col d-flex align-items-center">
          <h4 className="text-lightBlue fs-6 fw-500 me-2">All / Images</h4>
          <Tooltip
            title="Lorem ipsum"
            placement="top">
            <img
              src={info}
              alt="info"
              className="c-pointer"
              width={13.5}
            />
          </Tooltip>
        </div>
        <div className="col-auto">
          <Button
            variant="text"
            className="me-2">
            <span className="text-blue-2">+ Some Action</span>
          </Button>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
        <div className="col-2 my-2">
          <ImageIconView
            name="Images-products_1"
            size="456kb"
            type="JPG"
            isGreen
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesOnly;
