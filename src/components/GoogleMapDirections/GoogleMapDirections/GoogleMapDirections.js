import React, { Component } from "react";
import { DirectionsRenderer, GoogleMap, withGoogleMap } from "react-google-maps";
const google = window.google;

const DirectionsExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={props.center}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MapDirections extends Component {
  constructor() {
    super();
    this.state = {
      center: null,
      directions: null,
    };
  }

  componentDidMount() {
    const { origin, destination } = this.props;
    this.getDirection(origin, destination);
  }

  componentDidUpdate(prevProps) {
    const { origin, destination } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ center: [position.coords.latitude, position.coords.longitude] });
      });
    }
    if (origin !== prevProps.origin || destination !== prevProps.destination) {
      this.getDirection(origin, destination);
    }
  }

  getDirection(origin, destination) {
    if (destination) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(origin[0].coordinates.latitude, origin[0].coordinates.longitude),
          destination: new google.maps.LatLng(
            destination[0].coordinates.latitude,
            destination[0].coordinates.longitude
          ),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }

  render() {
    const { center, directions } = this.state;
    const { origin } = this.props;
    if (center) {
      return (
        <DirectionsExampleGoogleMap
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `550px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={new google.maps.LatLng(center[0], center[1])}
          directions={directions}
        />
      );
    }
    return null;
  }
}
