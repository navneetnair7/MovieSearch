import React from "react";
import TheaterMap from "./TheaterMap";

const Maps = ({ theaters }) => {
  return (
    <div>
      <TheaterMap theaters={theaters} />
    </div>
  );
};

export default Maps;
