import React from "react";
import foo from "../../../foo.config";
import zipcodes from "zipcodes";
import { GoLocation } from "react-icons/go";

const Map = ({ zip }) => {
  console.log(zip);
  let addressObj = zipcodes.lookup(zip);

  var map_title = {
    fontWeight: "700",
    color: "#292929",
    fontSize: "24px",
    overflowWrap: "break-word",
    textSizeAdjust: "100%",
    wordBreak: "break-word",
    fontFamily: "Lato",
    marginBottom: "16px"
  };

  var map_footer = {
    fontWeight: "400",
    color: "#717171",
    fontSize: ".875em",
    overflowWrap: "break-word",
    textSizeAdjust: "100%",
    wordBreak: "break-word",
    fontFamily: "Lato",
    marginLeft: "6px",
    lineHeight: "1.125em"
  };

  var map_iframe_container = {
    minHeight: "300px",
    maxHeight: "500px",
    height: "65vh"
  };

  return (
    <div>
      <h2>
        <span style={map_title}>{`Map`}</span>
      </h2>
      <div style={map_iframe_container}>
        <iframe
          width={"100%"}
          height={"100%"}
          frameBorder={0}
          style={{ border: 0, zindex: -1, border: "none" }}
          src={`https://www.google.com/maps/embed/v1/place?key=${foo.map}
            &q=${addressObj.city}+${addressObj.country}`}
          allowFullScreen
        ></iframe>
      </div>
      <div style={{ marginTop: "6px" }}>
        <span>
          <GoLocation color={"#717171"} size={12} />
        </span>
        <span style={map_footer}>
          {`${addressObj.city}, ${addressObj.state}, ${addressObj.country}`}
        </span>
      </div>
    </div>
  );
};

export default Map;
