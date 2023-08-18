import info from "../../../assets/icons/info.svg";

export default function StorageIndicator({ icon, name, used, total, color }) {
  return (
    <div className="border-grey-5 rounded-8 bg-black-13 p-2">
      <div className="row p-1">
        <div className="col-auto">
          <img
            src={icon}
            alt="icon"
            width={40}
          />
        </div>
        <div className="col d-flex flex-column">
          <small className="text-grey-6">Storage</small>
          <span className="text-lightBlue">{name}</span>
        </div>
      </div>
      <div className="row p-1">
        <div className="col mt-2">
          <span className="text-lightBlue">{used}GB</span>
          <span className="text-grey-6">&nbsp;/&nbsp;{total}GB</span>
        </div>
        <div className="col-auto">
          <img
            src={info}
            alt="icon"
            width={30}
            style={{ color }}
          />
        </div>
      </div>
    </div>
  );
}
