import React from "react";
import { GoogleMap, Marker } from "react-google-maps";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";

const AppGoogleMaps = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 19.1389388, lng: 72.8397314 }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: 19.1389388, lng: 72.8397314 }} />
      )}
    </GoogleMap>
  ))
);

export default AppGoogleMaps;
