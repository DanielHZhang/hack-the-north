import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const GOOGLE_API_KEY = 'AIzaSyAAdmfYG0av3FYi5RV-jK_sZKm2wS84BII';



class Map extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return(
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />

      </div>
    );
  }
}

export default Map;