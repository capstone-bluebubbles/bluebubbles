/* eslint-disable no-useless-constructor */
import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_API_KEY } from "../../secrets";


const styleMapSilver = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

export class Landing extends React.Component {

  defaultCenter = {
    lat: 41.90876,
    lng: -87.65065
  }

  constructor(props) {
    super(props)

    this.state = {
      currentCenter: this.defaultCenter,
      currentMessage: {
        txt: "Locating - Blockchain AI Working"
      }

    }
  }


  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('REACT -> Landing -> componentDidMount -> getCurrentPosition -> pos ->', pos)
        this.setState({
          currentCenter: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          },
          currentMessage: {
            txt: "Locating - Found"
          }
        })
      },
      (err) => {
        console.log('REACT -> Landing -> componentDidMount -> getCurrentPosition -> err ->', err)
        this.setState({
          currentMessage: {
            txt: `Locating - Error - ${err.message}`
          }
        })
      },
      options);
  }

  render() {
    /*
        var image = {
          url: '\favicon.ico',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new window.google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new window.google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new window.google.maps.Point(0, 32)
        };
    */
    var image = {
      url: '\\BubbleTarget400.png',
      size: new window.google.maps.Size(400, 400),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(10, 10),
      scaledSize: new window.google.maps.Size(20, 20)
    };

    const styleMapCSS = {
      width: "100%",
      height: "50%"
    };

    const currentCenter = this.state.currentCenter;
    console.log('REACT -> Landing -> componentDidMount -> this.state.currentCenter -> ', this.state.currentCenter)

    return (

      <div>
        <h3>Landing</h3>
        <h3>{this.state.currentMessage.txt}</h3>
        <Map
          google={this.props.google}
          zoom={15}
          center={{ lat: currentCenter.lat, lng: currentCenter.lng }}
          style={styleMapCSS}
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={false}
          styles={styleMapSilver}
        >
          <Marker
            position={this.defaultCenter}
            icon={image}
          >
          </Marker>
          <Marker
            position={this.state.currentCenter}
            icon={image}
          >
          </Marker>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(Landing);
