const ImportBtn = (props) => {
  const { onImport } = props;

  return (
    <button onClick={onImport} className="button-transparent me-1 py-2 px-3">
      <p className="text-lightBlue">Import</p>
    </button>
  );
};

export default ImportBtn;
