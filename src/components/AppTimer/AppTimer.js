import React from "react";
import { useTime } from "react-timer-hook";

const AppTimer = () => {
  //   const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  return (
    <div style={{ textAlign: "center" }} className="row mt-3">
      <div className="col-4">
        <h1 className="text-lightBlue bg-black-20 rounded-8 py-3">{hours}</h1>
      </div>
      <div className="col-4">
        <h1 className="text-lightBlue bg-black-20 rounded-8 py-3">{minutes}</h1>
      </div>
      <div className="col-4">
        <h1 className="text-lightBlue bg-black-20 rounded-8 py-3">{seconds}</h1>
      </div>
    </div>
  );
};

export default AppTimer;
