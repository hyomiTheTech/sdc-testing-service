import React from "react";
import { FaMapMarker } from "react-icons/fa";

const Icon = () => {
  const greatPlaceStyle = {
    position: "absolute",
    transform: "translate(-50%, -50%)"
  };

  return (
    <div style={greatPlaceStyle}>
      <FaMapMarker color={"#0067db"} size={25} />
    </div>
  );
};

export default Icon;
