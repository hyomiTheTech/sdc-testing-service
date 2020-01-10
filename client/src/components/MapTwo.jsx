import React, { Component } from "react";
import foo from "../../../foo.config";
import GoogleMapReact from "google-map-react";
import Icon from "./Icon.jsx";
import { GoLocation } from "react-icons/go";
import zipcodes from "zipcodes";

const MapTwo = props => {
  let addressObj = zipcodes.lookup(props.zip);

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
  if (props.zip === undefined) {
    return null;
  } else {
    return (
      <div>
        <h2>
          <span style={map_title}>{`Map`}</span>
        </h2>
        <div style={map_iframe_container}>
          <div style={{ height: "100%", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: foo.map }}
              google={props.google}
              defaultZoom={11}
              zoom={11}
              options={{
                panControl: true,
                mapTypeControl: true,
                scrollwheel: true,
                fullscreenControl: false,
                streetViewControl: true
              }}
              defaultCenter={{
                lat: addressObj.latitude,
                lng: addressObj.longitude
              }}
            >
              <Icon lat={addressObj.latitude} lng={addressObj.longitude} />
            </GoogleMapReact>
          </div>
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
  }
};

export default MapTwo;
