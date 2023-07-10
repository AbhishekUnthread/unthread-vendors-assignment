import arrowLeft from "../../assets/icons/arrowLeft.svg";
import paginationRight from "../../assets/icons/paginationRight.svg";
import paginationLeft from "../../assets/icons/paginationLeft.svg";

const InfoHeader = (props) => {
  const { title, onBack, onDuplicate, onPreview, onPrev, onNext, isEdit } =
    props;

  return (
    <div className="row justify-content-between">
      <div className="d-flex align-items-center w-auto ps-0">
        <button onClick={onBack} className="reset d-flex">
          <img
            src={arrowLeft}
            alt="arrowLeft"
            width={9}
            className="c-pointer"
          />
          <span className="page-heading ms-2 ps-1">{title}</span>
        </button>
      </div>

      <div className="d-flex align-items-center w-auto pe-0">
        {isEdit && onDuplicate && (
          <button
            onClick={onDuplicate}
            className="button-transparent me-1 py-2 px-3"
          >
            <span className="text-lightBlue">Duplicate</span>
          </button>
        )}
        {onPreview && (
          <button
            onClick={onPreview}
            className="button-transparent me-1 py-2 px-3"
          >
            <span className="text-lightBlue">Preview</span>
          </button>
        )}
        {isEdit && onPrev && (
          <button onClick={onPrev} className="reset">
            <img
              src={paginationLeft}
              alt="paginationLeft"
              className="c-pointer"
              width={30}
            />
          </button>
        )}
        {isEdit && onNext && (
          <button onClick={onNext} className="reset">
            <img
              src={paginationRight}
              alt="paginationRight"
              className="c-pointer"
              width={30}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoHeader;