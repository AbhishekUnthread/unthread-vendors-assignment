const ExportBtn = (props) => {
  const { onExport } = props;

  return (
    <button onClick={onExport} className="button-transparent me-1 py-2 px-3">
      <p className="text-lightBlue">Export</p>
    </button>
  );
};

export default ExportBtn;
