import cancel from "../../../assets/icons/cancel.svg";

const CustomerChip = (props) => {
  const { onDelete, option, className } = props;

  return (
    <div
      className={`rounded-pill d-flex align-items-center px-2 py-1 c-pointer ${className}`}
      style={{
        background:
          "linear-gradient(303.01deg, #2f2e69 -4.4%, #514969 111.29%)",
      }}
    >
      {option?.imageUrl && (
        <img
          src={option?.imageUrl}
          alt="icon"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
          }}
          className="me-2"
        />
      )}
      {option?.colour && (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: option?.colour,
          }}
          className="me-2"
        />
      )}
      <small className="fw-400 text-lightBlue">{option?.name}</small>
      <button type="button" className="reset" onClick={onDelete}>
        <img src={cancel} alt="cancel" width={20} className="c-pointer" />
      </button>
    </div>
  );
};

export default CustomerChip;
