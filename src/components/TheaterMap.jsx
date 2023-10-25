import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Maps extends Component {
  render() {
    const { theaters } = this.props;

    return (
      <Map
        google={this.props.google}
        zoom={10} // You can adjust the initial zoom level
        initialCenter={{ lat: 19.021289, lng: 72.8424089 }} // Initial center coordinates
        style={{
          width: "25%",
          height: "60%",
        }
        }
      >
        {theaters.map((theater, index) => (
          <Marker
            key={index}
            title={theater.name}
            position={{ lat: theater.lat, lng: theater.lng }}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmbS1uMvg-tN9ydkQmi50WaBaI-sxmqT0",
})(Maps);
