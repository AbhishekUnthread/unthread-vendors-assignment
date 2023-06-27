import ViewTutorial from "../ViewTutorial/ViewTutorial";
import SettingsBtn from "../SettingsBtn/SettingsBtn";

const PageTitleBar = (props) => {
  const { title, onTutorial, onSettings, onCreate, createBtnText } = props;

  return (
    <div className="row justify-content-between align-items-center">
      <h4 className="page-heading w-auto ps-0">{title}</h4>
      <div className="d-flex align-items-center w-auto pe-0">
        {onTutorial && <ViewTutorial onTutorial={onTutorial} />}
        {onSettings && <SettingsBtn onSettings={onSettings} />}
        {onCreate && (
          <button
            onClick={onCreate}
            className="button-gradient py-2 px-4 ms-3 c-pointer"
          >
            <p>{createBtnText}</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default PageTitleBar;
