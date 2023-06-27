const SettingsBtn = (props) => {
  const { onSettings } = props;

  return (
    <button onClick={onSettings} className="button-transparent me-1 py-2 px-3">
      <p className="text-lightBlue">Settings</p>
    </button>
  );
};

export default SettingsBtn;
