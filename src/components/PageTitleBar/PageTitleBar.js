import ViewTutorial from "../ViewTutorial/ViewTutorial";
import SettingsBtn from "../SettingsBtn/SettingsBtn";
import ImportBtn from "../ImportBtn/ImportBtn";
import ExportBtn from "../ExportBtn/ExportBtn";

const PageTitleBar = (props) => {
  const {
    title,
    onTutorial,
    onSettings,
    onSecondaryCreate,
    onCreate,
    createSecondaryBtnText,
    createBtnText,
    onImport,
    onExport,
  } = props;

  return (
    <div className="row justify-content-between align-items-center">
      <h4 className="page-heading w-auto ps-0">{title}</h4>
      <div className="d-flex align-items-center w-auto pe-0">
        {onTutorial && <ViewTutorial onTutorial={onTutorial} />}
        {onSettings && <SettingsBtn onSettings={onSettings} />}
        {onExport && <ExportBtn omExport={onExport} />}
        {onImport && <ImportBtn onImport={onImport} />}
        {onSecondaryCreate && (
          <button
            onClick={onSecondaryCreate}
            className="button-gradient py-2 px-4 ms-3 c-pointer"
          >
            <p>{createSecondaryBtnText}</p>
          </button>
        )}
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
